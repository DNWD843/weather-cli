#!/usr/bin/env node

import { resolveArguments, setValue } from './helpers/index.js'
import { dataKeyNames, shortKeys } from './constants/index.js'
import { LogService } from './services/index.js'
import * as dotenv from 'dotenv'

dotenv.config()

const initCLI = () => {
  const commandLineArgs = resolveArguments(process.argv)
  console.log(process.env.OPEN_WEATHER_API_KEY)

  if (!commandLineArgs || !Object.keys(commandLineArgs).length) {
    return
  }

  if (commandLineArgs[shortKeys.HELP]) {
    LogService.logHelp()
  }

  if (commandLineArgs[shortKeys.QUERY_PARAMS]) {
    console.log(commandLineArgs[shortKeys.QUERY_PARAMS])
    // request forecast
  }

  if (commandLineArgs[shortKeys.SET_CITY]) {
    const value = commandLineArgs[shortKeys.SET_CITY].length > 1
      ? commandLineArgs[shortKeys.SET_CITY].join(', ')
      : commandLineArgs[shortKeys.SET_CITY][0]

    return setValue({ key: dataKeyNames.CITY, value })
  }

  if (commandLineArgs[shortKeys.SET_TOKEN]) {
    return setValue({ key: dataKeyNames.TOKEN, value: commandLineArgs[shortKeys.SET_TOKEN] })

  }

  // show weather
}

initCLI()
