import axios from "axios";
import { apiConfig, GEO_CODING_URL, WEATHER_URL } from "../constants/index.js";

export class ApiService {
  static async fetchCoordinates({ cityParams, token }) {
    const { data } = await axios.get(GEO_CODING_URL, {
      params: {
        q: cityParams,
        appid: token,
        ...apiConfig
      }
    })

    const [geoData] = data

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
