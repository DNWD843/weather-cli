#!/usr/bin/env node

import { resolveArguments, setValue } from './helpers/index.js'
import { dataKeyNames, shortKeys } from './constants/index.js'
import { LogService } from './services/index.js'
import * as dotenv from 'dotenv'

dotenv.config()

const initCLI = () => {
  const commandLineArgs = resolveArguments(process.argv)
  console.log(process.env.OPEN_WEATHER_API_KEY)

  if (commandLineArgs[shortKeys.HELP]) {
    LogService.logHelp()
  }

  if (commandLineArgs[shortKeys.CITY]) {
    return setValue({ key: dataKeyNames.CITY, value: commandLineArgs[shortKeys.CITY] })
  }

  if (commandLineArgs[shortKeys.TOKEN]) {
    return setValue({ key: dataKeyNames.TOKEN, value: commandLineArgs[shortKeys.TOKEN] })

  }

  // show weather
}

initCLI()
