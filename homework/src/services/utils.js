const processData = function(results) {
  return results.data.map((row, index) => {
    const lowerCaseRow = Object.keys(row).reduce((acc, key) => {
      acc[key.toLowerCase()] = row[key];
      return acc;
    }, {});
    return {
      id: index + 1, // assign an id to each row
      ...lowerCaseRow, // lowercase keys
    };
  });
}

const groupAndIndex = function(data, key, limit) {
  const grouped = data.reduce((acc, row) => {
    const groupKey = row[key];
    if (!acc[groupKey]) {
      acc[groupKey] = { values: [], yIndex: 0, xIndex: 0 };
    }
    if (acc[groupKey].yIndex >= limit) {
      acc[groupKey].yIndex = 0;
      acc[groupKey].xIndex++;
    }
    row.yIndex = acc[groupKey].yIndex++;
    row.xIndex = acc[groupKey].xIndex;
    acc[groupKey].values.push(row);
    return acc;
  }, {});

  const indexed = Object.entries(grouped).map(([, group]) => group.values);

  return indexed.flat();
}

export { processData, groupAndIndex }