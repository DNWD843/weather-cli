import axios from 'axios'
import { apiConfig, GEO_CODING_URL, messages, WEATHER_URL } from '../constants/index.js'
import https from 'https'

export class ApiService {
  /**
   * @deprecated
   * Просто демонстрация реализации на https
   */
  static async #getWeather_DEPRECATED({lat, lon, token}) {
    return new Promise((resolve, reject) => {
      const url = new URL(WEATHER_URL)
      url.searchParams.append('lat', lat)
      url.searchParams.append('lon', lon)
      url.searchParams.append('appid', token)
      url.searchParams.append('lang', 'ru')
      url.searchParams.append('units', 'metric')
      url.searchParams.append('limit', '1')

      https.get(url, response => {
        let res = ''
        response.on('data', chunk => {
          res += chunk
        })

        response.on('end', () => resolve(res))
        response.on('error', error => reject(error))
      })
    })
  }
  static async fetchCoordinates({ cityParams, token }) {
    const { data } = await axios.get(GEO_CODING_URL, {
      params: {
        q: cityParams,
        appid: token,
        ...apiConfig
      }
    })

    const [geoData] = data

    if (!geoData) {
      throw new Error(messages.NOT_FOUND)
    }

    const { name, state, country, lat, lon } = geoData

    return { name, state, country, lat, lon }
  }

  static async fetchWeather({ lat, lon, token }) {
    const { data } = await axios.get(WEATHER_URL, {
      params: {
        lat,
        lon,
        appid: token,
        ...apiConfig
      }
    })

    return data
  }
}
