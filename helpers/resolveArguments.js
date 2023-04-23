import {
  PARAMS_MAX_ENABLED_QUANTITY,
  PARAMS_REQUIRED_QUANTITY,
  messages,
  SECOND_CHAR_INDEX,
  SHORT_KEY_FULL_LENGTH,
  SHORT_KEY_PREFIX,
  SHORT_KEYS_CORRECT_QUANTITY,
  shortKeys, ERROR
} from "../constants/index.js";
import { LogService } from "../services/index.js";

export const resolveArguments = ([executer, file, ...params]) => {
  const shortKeysQuantity = params.filter(el => el.startsWith(SHORT_KEY_PREFIX)).length
  const relatedArgumentsQuantity = params.filter(el => !el.startsWith(SHORT_KEY_PREFIX)).length

  if ((!shortKeysQuantity && relatedArgumentsQuantity) || shortKeysQuantity > SHORT_KEYS_CORRECT_QUANTITY) {
    LogService.logError(messages.INCORRECT_COMMAND)


    return {[ERROR]: true}
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

    const isCommandRelatedToCity = shortKey === shortKeys.WEATHER_FOR_CITY || shortKey === shortKeys.SET_DEFAULT_CITY
    const isIncorrectCityParamsQuantity = isCommandRelatedToCity && source.length > PARAMS_MAX_ENABLED_QUANTITY
    const isCommandWithEmptyArguments = shortKey && shortKey !== shortKeys.HELP && !relatedArgumentsQuantity

    if (isIncorrectShortKey) {
      LogService.logError(`Incorrect parameter: ${argument}`)
      result[ERROR] = true
    } else if (isIncorrectCityParamsQuantity) {
      LogService.logError(messages.INCORRECT_COMMAND)
      result[ERROR] = true
    } else if (isCommandWithEmptyArguments) {
      LogService.logError(messages.EMPTY_VALUE)
      result[ERROR] = true
    } else if (isCommandRelatedToCity) {
      result[shortKey] = source.slice(1)
    } else if (shortKey && relatedArgument) {
      result[shortKey] = relatedArgument
    } else if (shortKey && !relatedArgument) {
      result[shortKey] = true
    }

    return result
  }, {})
}
