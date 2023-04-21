import { homedir } from 'os'
import { join } from 'path'
import { promises } from 'fs'

/**
 * Description of path base methods:
 * join {Function} - to create full path
 * basename - to get the last path level
 * dirname - to get target`s parent directory
 * extname - to get an extension name
 * relative - to get relative path from start point to target point
 * isAbsolute - to get the path description - relative or absolute
 * resolve - to get path by relative path (example: resolve('..'))
 * sep - to get description about system separator
 */

export class StorageService {
  static #filePath = join(homedir(), 'weatherCLI-data.json')
  static #data = {}

  static #clearData = () => {
    this.#data = {}
  }

  static #checkFileExistence = async path => {
    try {
      const stat = await promises.stat(path)

      return stat.isFile()
    } catch (err) {
      return false
    }
  }

  static #getFileData = async path => {
    const file = await promises.readFile(path)

    return JSON.parse(file)
  }

  static saveData = async ({ key, value }) => {
    this.#clearData()
    const isFileExists = await this.#checkFileExistence(this.#filePath)

    if (isFileExists) {
      this.#data = await this.#getFileData(this.#filePath)
    }

    this.#data[key] = value
    await promises.writeFile(this.#filePath, JSON.stringify(this.#data))

    return true
  }

  static getData = async key => {
    const isFileExists = await this.#checkFileExistence(this.#filePath)

    if (isFileExists) {
      const data = await this.#getFileData(this.#filePath)

      return data[key]
    }

    return undefined
  }
}
