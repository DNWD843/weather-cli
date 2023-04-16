#!/usr/bin/env node

import { resolveArguments } from "./helpers/index.js";
import { shortKeys } from "./constants/index.js";

const initCLI = () => {
  const commandLineArgs = resolveArguments(process.argv)
  console.log(commandLineArgs)

  if (commandLineArgs[shortKeys.HELP]) {
    // show help
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
