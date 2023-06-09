import { ApiService, LogService, StorageService } from '../services/index.js'
import {
  CITY_URL_PARAMS_SEPARATOR,
  dataKeyNames,
  DEMO_API_KEY,
  messages,
  SAVED_CITY_KEY_SEPARATOR
} from '../constants/index.js'

export async function getWeatherByParams(cityParams) {
  try {
    const token = process.env.OPEN_WEATHER_API_KEY || await StorageService.getData(dataKeyNames.TOKEN) || DEMO_API_KEY

    if (!token) {
      LogService.logError(messages.NO_TOKEN)
      return
    }

    let latitude, longitude
    const cityKey = cityParams.join(SAVED_CITY_KEY_SEPARATOR)
    const savedCities = await StorageService.getData(dataKeyNames.CITIES) || {}

    if (savedCities[cityKey]) {
      const { lat, lon } = savedCities[cityKey]
      latitude = lat
      longitude = lon
    } else {
      const fetchedCoords = await ApiService.fetchCoordinates({ cityParams: cityParams.join(CITY_URL_PARAMS_SEPARATOR), token })

      if (!fetchedCoords) {
        LogService.logError(messages.NOT_FOUND)
        return
      }

      const { lat, lon } = fetchedCoords
      latitude = lat
      longitude = lon

      savedCities[cityKey] = { lat, lon }

      await StorageService.saveData({ key: dataKeyNames.CITIES, value: savedCities })
    }

    const weatherData = await ApiService.fetchWeather({ lat: latitude, lon: longitude, token })
    LogService.logWeather(weatherData)
  } catch (e) {
    if (e?.response?.status === 404) {
      LogService.logError(messages.NOT_FOUND)
    } else if (e?.response?.status === 401) {
      LogService.logError(messages.INCORRECT_TOKEN)
    } else if (e?.response?.status === 400) {
      LogService.logError(messages.INCORRECT_PARAMS)
    } else {
      LogService.logError(e.message)
    }
  }
}

export async function getWeatherForSavedCity() {
  try {
    const token = process.env.OPEN_WEATHER_API_KEY || await StorageService.getData(dataKeyNames.TOKEN) || DEMO_API_KEY

    if (!token) {
      LogService.logError(messages.NO_TOKEN)
      return
    }

    let savedCity = await StorageService.getData(dataKeyNames.DEFAULT_CITY)

    if (!savedCity) {
      LogService.logError(messages.NO_DEFAULT_CITY)
      return
    }

    const weatherData = await ApiService.fetchWeather({ lat: savedCity.lat, lon: savedCity.lon, token })
    LogService.logWeather(weatherData)
  } catch (e) {
    if (e?.response?.status === 404) {
      LogService.logError(messages.NOT_FOUND)
    } else if (e?.response?.status === 401) {
      LogService.logError(messages.INCORRECT_TOKEN)
    } else if (e?.response.status === 400) {
      LogService.logError(messages.INCORRECT_PARAMS)
    } else {
      LogService.logError(e.message)
    }
  }
}

export async function setDefaultCity(cityParams) {
  try {
    const cityKey = cityParams.join(SAVED_CITY_KEY_SEPARATOR)
    const savedCities = await StorageService.getData(dataKeyNames.CITIES) || {}
    let defaultCityCoords

    if (savedCities[cityKey]) {
      defaultCityCoords = savedCities[cityKey]
    } else {
      const token = process.env.OPEN_WEATHER_API_KEY || await StorageService.getData(dataKeyNames.TOKEN) || DEMO_API_KEY
      if (!token) {
        LogService.logError(messages.NO_TOKEN)
        return
      }

      const fetchedCoords = await ApiService.fetchCoordinates({ cityParams: cityParams.join(CITY_URL_PARAMS_SEPARATOR), token })

      if (!fetchedCoords) {
        LogService.logError(messages.NOT_FOUND)
        return
      }

      const { lat, lon } = fetchedCoords
      defaultCityCoords =  { lat, lon }
    }

    const isSaved = await StorageService.saveData({ key: dataKeyNames.DEFAULT_CITY, value: defaultCityCoords })

    if (isSaved) {
      LogService.logSuccess(messages.SET_CITY_SUCCESS)
    } else {
      LogService.logError(messages.FAILURE)
    }

  } catch (e) {
    LogService.logError(e.message)
  }
}

export async function setToken(token) {
  try {
    const isSaved = await StorageService.saveData({ key: dataKeyNames.TOKEN, value: token })

    if (isSaved) {
      LogService.logSuccess(messages.SET_TOKEN_SUCCESS)
    } else {
      LogService.logError(messages.FAILURE)
    }
  } catch (e) {
    LogService.logError(e.message)
  }
}
export function logHelp() {
  return  LogService.logHelp()
}
