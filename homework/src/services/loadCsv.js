import Papa from 'papaparse'

const loadCsv = (file) => {
  // papaparse works with callbacks, so we wrap it in a promise
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      skipEmptyLines: true,
      download: true,
      header: true,
      complete: function(results) {
        resolve(results.data);
      },
      error: function(error) {
        reject(error);
      }
    });
  });
}

export { loadCsv }