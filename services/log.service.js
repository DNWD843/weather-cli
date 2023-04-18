import chalk from 'chalk'
import dedent from 'dedent-js'
import { shortKeys, titles } from "../constants/index.js";

const { bgRed, bgGreen, red  } = chalk

const lightGrey = chalk.hex('#DCDCDC')
const gold = chalk.hex('#FFD700')

export class LogService {
  static #help = dedent`${chalk.bgHex('#FFD700').hex('#D2691E').bold(` ${titles.HELP} `)}
    ${gold('no-parameters')} ${lightGrey('- to see forecast for saved city')}
    ${gold(`-${shortKeys.CITY}`)}  ${lightGrey('[CITY] to set city')}
    ${gold(`-${shortKeys.TOKEN}`)}  ${lightGrey('[API_KEY] to set token')}
    ${gold(`-${shortKeys.HELP}`)}  ${lightGrey('[HELP] to see help')}
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
