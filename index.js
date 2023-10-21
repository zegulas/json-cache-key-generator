// import { createHash } from 'crypto';
const createHash = require('crypto').createHash;

function isJSONString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function sortObjectKeys(obj) {
  if (typeof obj === 'string') {
    if (isJSONString(obj)) {
      const parsed = JSON.parse(obj);
      const sorted = sortObjectKeys(parsed);
      return JSON.stringify(sorted);
    } else {
      return obj;
    }
  }

  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    // If it's an array, we map over it, sort any objects or arrays within it, 
    // and sort the array itself if it's an array of primitives.
    return obj
      .map(sortObjectKeys) // sort elements of the array
      .sort((a, b) => {
        if (typeof a === 'object') {
          // For object or array, stringify because we can't directly compare them
          a = JSON.stringify(a);
          b = JSON.stringify(b);
        }
        // If a is less than b in the sorting order, it results in a negative value
        // If a is greater than b in the sorting order, it results in a positive value
        // If a is equal to b in the sorting order, it results in 0
        return a < b ? -1 : a > b ? 1 : 0;
      });
  }

  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      result[key] = sortObjectKeys(obj[key]);
      return result;
    }, {});
};  

function generateCacheKeyFromJson(queryParamsJson) {
  try {
    // Step 1: Parse the JSON string
    const queryParamsObj = JSON.parse(queryParamsJson);

    // Step 2: Sort the keys
    const sortedQueryParamsObj = sortObjectKeys(queryParamsObj);

    // Step 3: Stringify the JSON object
    const sortedQueryParamsString = JSON.stringify(sortedQueryParamsObj);

    // Step 4: Hash the string using SHA-256
    const hash = createHash('sha256');
    hash.update(sortedQueryParamsString);
    const key = hash.digest('hex'); // 'hex' means we want the string in hexadecimal format

    return key;
  } catch (err) {
    // Handle exceptions, for example, from parsing invalid JSON
    console.error('Failed to generate key', err);
    throw err; // or return an error value, or handle it however you see fit
  }
};

module.exports = generateCacheKeyFromJson;