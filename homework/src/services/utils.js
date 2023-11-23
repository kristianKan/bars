const processData = function(results) {
  return results.data.map((row, index) => {
    const lowerCaseRow = Object.keys(row).reduce((acc, key) => {
      acc[key.toLowerCase()] = row[key]
      return acc
    }, {})
    return {
      id: index + 1, // assign an id to each row
      ...lowerCaseRow, // lowercase keys
    }
  })
}

const groupAndIndex = function(data, key, limit) {
  const grouped = data.reduce((acc, row) => {
    const groupKey = row[key]
    if (!acc[groupKey]) {
      acc[groupKey] = { values: [], yIndex: 0, xIndex: 0 }
    }
    if (acc[groupKey].xIndex >= limit) {
      acc[groupKey].xIndex = 0
      acc[groupKey].yIndex++
    }
    const newRow = {
      ...row, // copy all existing properties
      xIndex: acc[groupKey].xIndex++,
      yIndex: acc[groupKey].yIndex,
    }
    acc[groupKey].values.push(newRow)
    return acc
  }, {})

  const indexed = Object.entries(grouped).map(([, group]) => group.values)

  return indexed.flat()
}

const getUniqueKeys = function(data, key) {
  const keys = []
  const counts = {}

  data.forEach(row => {
    if (!counts[row[key]]) {
      keys.push(row[key])
      counts[row[key]] = 1
    } else {
      counts[row[key]]++
    }
  })

  return {
    keys: keys.sort((a, b) => a - b),
    counts: counts
  }
}

export { processData, groupAndIndex, getUniqueKeys }