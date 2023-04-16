import { SECOND_CHAR_INDEX, SHORT_KEY_FULL_LENGTH, SHORT_KEY_PREFIX } from "../constants/index.js";

export const resolveArguments = ([executer, file, ...params]) => params.reduce((result, argument, index, source) => {
  const shortKey = argument.length === SHORT_KEY_FULL_LENGTH && argument.startsWith(SHORT_KEY_PREFIX)
    ? argument.substring(SECOND_CHAR_INDEX)
    : null

  const relatedArgument = source[index + 1] && !source[index + 1].startsWith(SHORT_KEY_PREFIX)
    ? source[index + 1]
    : null

  if (shortKey && relatedArgument) {
    result[shortKey] = relatedArgument
  }

  if (shortKey && !relatedArgument) {
    result[shortKey] = true
  }

  if (argument.startsWith(SHORT_KEY_PREFIX) && argument.length > SHORT_KEY_FULL_LENGTH) {
    console.log(`Error: Incorrect parameter: ${argument}`)
  }

  return result
}, {})
