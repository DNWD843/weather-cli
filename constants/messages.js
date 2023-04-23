import { shortKeys } from "./shortKeys.js";

export const messages = {
  SET_TOKEN_SUCCESS : 'Token saved successfully',
  SET_CITY_SUCCESS : 'Default city name saved successfully',
  FAILURE: 'Something went wrong.',
  EMPTY_VALUE: 'Value can not be empty.',
  SUCCESS_DEFAULT: 'Success!',
  INCORRECT_COMMAND: `Incorrect command. For help use "-${shortKeys.HELP}" key.`,
  NO_DEFAULT_CITY: `You have not set the default city. Please, set the default city using command "-${shortKeys.SET_DEFAULT_CITY} [CITY_NAME]" or run "-${shortKeys.HELP}" for help.`,
  NO_TOKEN: `You have not set the api-key. Please, set the api-key using command "-${shortKeys.SET_TOKEN} [API_KEY]"`,
  NOT_FOUND: 'City not found. Please, change city params and try again.',
  INCORRECT_TOKEN: 'Passed incorrect api-key. Set correct api-key and try again.',
  INCORRECT_PARAMS: 'Incorrect params. Please, change params and try again.',
}
