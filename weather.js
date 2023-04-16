#!/usr/bin/env node

import { resolveArguments } from "./helpers/index.js";
import { shortKeys } from "./constants/index.js";
import { logHelp } from "./services/index.js";

const initCLI = () => {
  const commandLineArgs = resolveArguments(process.argv)

  if (commandLineArgs[shortKeys.HELP]) {
    logHelp()
  }

  if (commandLineArgs[shortKeys.CITY]) {
    // save city
  }

  if (commandLineArgs[shortKeys.TOKEN]) {
    // save token
  }

  // show weather
}

initCLI()
