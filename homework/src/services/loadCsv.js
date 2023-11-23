import Papa from "papaparse"
import { processData } from "./utils"

const loadCsv = (file) => {
  // papaparse works with callbacks, so we wrap it in a promise
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      skipEmptyLines: true,
      dynamicTyping: true,
      download: true,
      header: true,
      complete: function(results) {
        const dataWithIds = processData(results)
        resolve(dataWithIds)
      },
      error: function(error) {
        reject(error)
      }
    })
  })
}

export { loadCsv }