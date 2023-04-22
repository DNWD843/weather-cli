#!/usr/bin/env node

import { resolveArguments } from './helpers/index.js'
import { shortKeys } from './constants/index.js'
import * as dotenv from 'dotenv'
import {
  getWeatherByParams,
  getWeatherForDefaultCity,
  logHelp,
  setDefaultCity,
  setToken
} from './cliMethods/cliMethods.js'

dotenv.config()

const initCLI = () => {
    const commandLineArgs = resolveArguments(process.argv)

    if (commandLineArgs[shortKeys.HELP]) {
      return logHelp()
    }

    if (commandLineArgs[shortKeys.WEATHER_FOR_CITY]) {
      return getWeatherByParams(commandLineArgs[shortKeys.WEATHER_FOR_CITY])
    }

    if (commandLineArgs[shortKeys.SET_DEFAULT_CITY]) {
      return setDefaultCity(commandLineArgs[shortKeys.SET_DEFAULT_CITY])
    }

    if (commandLineArgs[shortKeys.SET_TOKEN]) {
      return setToken(commandLineArgs[shortKeys.SET_TOKEN])
    }

    return getWeatherForDefaultCity()
}

initCLI()
