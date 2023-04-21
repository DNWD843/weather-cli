import axios from "axios";
import { apiConfig, GEO_CODING_URL, WEATHER_URL } from "../constants/index.js";

export class ApiService {
  static async fetchCoordinates({ city_params, token }) {
    const { data } = await axios.get(GEO_CODING_URL, {
      params: {
        q: city_params,
        appid: token,
        ...apiConfig
      }
    })

    const [weatherData] = data

    const { name, state, country, lat, lon } = weatherData

    return { name, state, country, lat, lon }
  }

  static async fetchForecast({ lat, lon, token }) {
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
