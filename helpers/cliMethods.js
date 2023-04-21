import { ApiService, LogService, StorageService } from "../services/index.js";
import { dataKeyNames, messages } from "../constants/index.js";

export const saveData = async ({ key, value }) => {
  if (typeof value !== 'string' || !value.length) {
    LogService.logError(messages.EMPTY_VALUE)

    return
  }

  let successMessage = ''

  switch(key) {
    case(dataKeyNames.TOKEN):
      successMessage = messages.SET_TOKEN_SUCCESS
      break
    case(dataKeyNames.DEFAULT_CITY):
      successMessage = messages.SET_CITY_SUCCESS
      break
    default:
      successMessage = messages.SUCCESS_DEFAULT
  }

  try {
    const isSaved = await StorageService.saveData({ key, value })

    if (isSaved) {
      LogService.logSuccess(successMessage)
    } else {
      LogService.logError(messages.SET_VALUE_FAILURE)
    }
  } catch (err) {
    LogService.logError(err.message)
  }
}

export async function getWeather(cityParams) {
  try {
    const token = process.env.OPEN_WEATHER_API_KEY || await StorageService.getData(dataKeyNames.TOKEN)
    if (!token) {
      LogService.logError('Token was`nt set. Please, set token using command "-t api_key"')
      return
    }
    if (!cityParams) {
      // запрос по дефолтному городу
      // если его нет - определить по ОС, сохранить как дефолт в data, запросить по полученным данным
    }

    let latitude, longitude
    const cityKey = cityParams.join('_')
    const savedCoords = await StorageService.getData(`${dataKeyNames.CITIES}[${cityKey}]`)

    if (savedCoords) {
      const { lat, lon } = savedCoords
      latitude = lat
      longitude = lon
    } else {
      const fetchedCoords = await ApiService.fetchCoordinates({ city_params: cityParams.join(', '), token })
      const { lat, lon, country, state, name } = fetchedCoords
      latitude = lat
      longitude = lon

      await saveData({ key: `${dataKeyNames.CITIES}[${cityKey}]`, value: { lat: latitude, lon: longitude } })
    }

    return await ApiService.fetchForecast({ lat: latitude, lon: longitude, token })
  } catch (e) {
    LogService.logError(e.message)
  }

}

// export async function getTokenFromSavedData() {
//   try {
//     const token = process.env.OPEN_WEATHER_API_KEY || await StorageService.getData(dataKeyNames.TOKEN)
//
//     if (!token) {
//       LogService.logError('Token is not found! You need to set the correct token.')
//     }
//
//     return token
//   } catch (err) {
//     LogService.logError(err.message)
//   }
// }
//
// export const getCity = async () => {
//   try {
//     const token = process.env.OPEN_WEATHER_API_KEY || await StorageService.getData(dataKeyNames.TOKEN)
//     if (!token) {
//       LogService.logError('Token is not found! You need to set correct token.')
//     }
//
//     return token
//   } catch (err) {
//     LogService.logError(err.message)
//   }
// }
