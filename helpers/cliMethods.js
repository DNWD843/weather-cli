import { LogService, StorageService } from "../services/index.js";
import { dataKeyNames, messages } from "../constants/index.js";

export const setToken = async token => {
  try {
    await StorageService.saveValue({ key: dataKeyNames.TOKEN, value: token })
    LogService.logSuccess(messages.SET_TOKEN_SUCCESS)
  } catch (err) {
    LogService.logError(err)
  }
}
