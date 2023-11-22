const getUniqueKeys = function(data, key) {
    const keys = [];
    const counts = {};
  
    data.forEach(row => {
      if (!counts[row[key]]) {
        keys.push(row[key]);
        counts[row[key]] = 1;
      } else {
        counts[row[key]]++;
      }
    });
  
    return {
      keys: keys.sort((a, b) => a - b),
      counts: counts
    };
  }

  export { getUniqueKeys }