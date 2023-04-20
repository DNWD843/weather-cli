import {
  PARAMS_MAX_ENABLED_QUANTITY,
  PARAMS_REQUIRED_QUANTITY,
  messages,
  SECOND_CHAR_INDEX,
  SHORT_KEY_FULL_LENGTH,
  SHORT_KEY_PREFIX,
  SHORT_KEYS_CORRECT_QUANTITY,
  shortKeys
} from "../constants/index.js";
import { LogService } from "../services/index.js";

export const resolveArguments = ([executer, file, ...params]) => {
  if (params.filter(el => el.startsWith(SHORT_KEY_PREFIX)).length > SHORT_KEYS_CORRECT_QUANTITY) {
    LogService.logError(messages.INCORRECT_COMMAND)

    return
  }

  return params.reduce((result, argument, index, source) => {
    const shortKey = argument.length === SHORT_KEY_FULL_LENGTH && argument.startsWith(SHORT_KEY_PREFIX)
      ? argument.substring(SECOND_CHAR_INDEX)
      : null

    const relatedArgument = source[index + 1] && !source[index + 1].startsWith(SHORT_KEY_PREFIX)
      ? source[index + 1]
      : null

    const isIncorrectShortKey = (argument.startsWith(SHORT_KEY_PREFIX) && argument.length > SHORT_KEY_FULL_LENGTH) ||
      (shortKey && !Object.values(shortKeys).includes(shortKey))

    const isIncorrectCitySearchCommand = (shortKey === shortKeys.QUERY_PARAMS && !relatedArgument) ||
      (shortKey === shortKeys.QUERY_PARAMS &&  source.length > PARAMS_MAX_ENABLED_QUANTITY)

    if (isIncorrectShortKey) {
      LogService.logError(`Incorrect parameter: ${argument}`)
    }

    if (isIncorrectCitySearchCommand) {
      LogService.logError(messages.INCORRECT_COMMAND)

      return result
    }

    if (shortKey === shortKeys.QUERY_PARAMS) {
      result[shortKey] = source.slice(1)

      return result
    }

    if (shortKey && relatedArgument) {
      result[shortKey] = relatedArgument
    } else if (shortKey && !relatedArgument) {
      result[shortKey] = true
    }

    return result
  }, {})
}
