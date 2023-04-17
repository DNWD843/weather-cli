#!/usr/bin/env node

import { resolveArguments, setToken } from "./helpers/index.js";
import { shortKeys } from "./constants/index.js";
import { LogService } from "./services/index.js";

const initCLI = () => {
  const commandLineArgs = resolveArguments(process.argv)

  if (commandLineArgs[shortKeys.HELP]) {
    LogService.logHelp()
  }

  if (commandLineArgs[shortKeys.CITY]) {
    // save city
  }

  if (commandLineArgs[shortKeys.TOKEN]) {
    return setToken(commandLineArgs[shortKeys.TOKEN])

  }

  // show weather
}

initCLI()
