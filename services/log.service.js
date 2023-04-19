import chalk from 'chalk'
import dedent from 'dedent-js'
import { shortKeys, titles } from "../constants/index.js";

const { bgRed, bgGreen, red, magenta  } = chalk

const lightGrey = chalk.hex('#DCDCDC')
const gold = chalk.hex('#FFD700')

export class LogService {
  static #help = dedent`${chalk.bgHex('#FFD700').hex('#D2691E').bold(` ${titles.HELP} `)}
    ${gold('no-parameters')} ${lightGrey('- to get forecast by saved city')}
    ${gold(`-${shortKeys.QUERY_PARAMS} [CITY_NAME]`)} ${lightGrey('- to get forecast by passed city name')}
    ${gold(`-${shortKeys.QUERY_PARAMS} [CITY_NAME COUNTRY_CODE]`)} ${lightGrey('- to get forecast by passed city name and country code')}
    ${gold(`-${shortKeys.QUERY_PARAMS} [CITY_NAME STATE_CODE COUNTRY_CODE]`)} ${lightGrey('- to get forecast by passed city name, state code and country code')}
    ${gold(`-${shortKeys.CITY} [CITY_NAME] or [CITY_NAME/COUNTRY_CODE] or [CITY_NAME/STATE_CODE/COUNTRY_CODE]`)}  ${lightGrey('- to set city')}
    ${gold(`-${shortKeys.TOKEN} [API_KEY]`)}  ${lightGrey('- to set token')}
    ${gold(`-${shortKeys.HELP}`)}  ${lightGrey('- to see help')}
    
    ${magenta('EXAMPLES:')}
    ${magenta('weather')}
    ${magenta('weather -p saint-petersburg')}
    ${magenta('weather -p saint-petersburg us')}
    ${magenta('weather -p saint-petersburg colorado us')}
    ${magenta('weather -c moscow')}
    ${magenta('weather -c moscow/us')}
    ${magenta('weather -c moscow/idaho/us')}
    ${magenta('weather -t some_api_key')}
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
