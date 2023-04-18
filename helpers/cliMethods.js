import { LogService, StorageService } from "../services/index.js";
import { dataKeyNames, messages } from "../constants/index.js";

export const setToken = async token => {
  if (typeof token !== 'string' || !token.length) {
    LogService.logError(messages.EMPTY_VALUE)

    return
  }

  try {
    const isSaved = await StorageService.saveValue({ key: dataKeyNames.TOKEN, value: token })

    if (isSaved) {
      LogService.logSuccess(messages.SET_TOKEN_SUCCESS)
    } else {
      LogService.logError(messages.SET_VALUE_FAILURE)
    }
  } catch (err) {
    LogService.logError(err)
  }
}
