import chalk from 'chalk'
import dedent from 'dedent-js'
import { shortKeys, titles } from "../constants/index.js";

const { bgRed, bgGreen, red, magenta  } = chalk

const lightGrey = chalk.hex('#DCDCDC')
const gold = chalk.hex('#FFD700')

export class LogService {
  static #help = dedent`${chalk.bgHex('#FFD700').hex('#D2691E').bold(` ${titles.HELP} `)}
    ${gold('no-parameters')} ${lightGrey('- to get weather description for saved city')}
    ${gold(`-${shortKeys.WEATHER_FOR_CITY} [CITY_NAME]`)} ${lightGrey('- to get weather description by passed city name')}
    ${gold(`-${shortKeys.WEATHER_FOR_CITY} [CITY_NAME COUNTRY_CODE]`)} ${lightGrey('- to get weather description by passed city name and country code')}
    ${gold(`-${shortKeys.WEATHER_FOR_CITY} [CITY_NAME STATE_CODE COUNTRY_CODE]`)} ${lightGrey('- to get weather description by passed city name, state code and country code')}
    ${gold(`-${shortKeys.SET_DEFAULT_CITY} [CITY_NAME] or [CITY_NAME COUNTRY_CODE] or [CITY_NAME STATE_CODE COUNTRY_CODE]`)}  ${lightGrey('- to set default city')}
    ${gold(`-${shortKeys.SET_TOKEN} [API_KEY]`)}  ${lightGrey('- to set token')}
    ${gold(`-${shortKeys.HELP}`)}  ${lightGrey('- to see help')}
    
    ${magenta('EXAMPLES:')}
    ${magenta('weather')}
    ${magenta(`weather -${shortKeys.WEATHER_FOR_CITY} saint-petersburg`)}
    ${magenta(`weather -${shortKeys.WEATHER_FOR_CITY} saint-petersburg us`)}
    ${magenta(`weather -${shortKeys.WEATHER_FOR_CITY} saint-petersburg colorado us`)}
    ${magenta(`weather -${shortKeys.SET_DEFAULT_CITY} moscow`)}
    ${magenta(`weather -${shortKeys.SET_DEFAULT_CITY} moscow us`)}
    ${magenta(`weather -${shortKeys.SET_DEFAULT_CITY} moscow idaho us`)}
    ${magenta(`weather -${shortKeys.SET_TOKEN} some_api_key`)}
  `

  static logError = err => {
    console.log(`${bgRed.bold(` ${titles.ERROR} `)} ${red(err)}`)
  }

  static logSuccess = msg => {
    console.log(`${bgGreen.bold(` ${titles.SUCCESS} `)} ${msg}`)
  }

  static logHelp = () => {
    console.log(this.#help)
  }
}
