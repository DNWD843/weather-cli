import { LogService, StorageService } from "../services/index.js";
import { dataKeyNames, messages } from "../constants/index.js";

export const setValue = async ({ key, value }) => {
  if (typeof value !== 'string' || !value.length) {
    LogService.logError(messages.EMPTY_VALUE)

    return
  }

  let successMessage = ''

  switch(key) {
    case(dataKeyNames.TOKEN):
      successMessage = messages.SET_TOKEN_SUCCESS
      break
    case(dataKeyNames.CITY):
      successMessage = messages.SET_CITY_SUCCESS
      break
    default:
      successMessage = messages.SUCCESS_DEFAULT
  }

  try {
    const isSaved = await StorageService.saveValue({ key, value })

    if (isSaved) {
      LogService.logSuccess(successMessage)
    } else {
      LogService.logError(messages.SET_VALUE_FAILURE)
    }
  } catch (err) {
    LogService.logError(err)
  }
}
