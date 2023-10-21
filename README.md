# json-cache-key-generator

Easily generate a deterministic cache key from a JSON object with any level of nesting, which is useful for caching, memoization, and other scenarios where a unique identifier for JSON content is needed.

## Features

- Generates a unique key for JSON objects considering all levels of nesting.
- Sorts objects and arrays within the JSON to ensure the key is the same regardless of the order of properties or elements.
- Utilizes SHA-256 hashing to ensure a fixed-size, unique key.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install json-cache-key-generator.

```bash
npm install json-cache-key-generator
```

## Usage

```javascript
import { generateCacheKeyFromJson } from 'json-cache-key-generator';

// The JSON object for which we're generating a key
const jsonObj = `{
  "param1": "value1",
  "param2": ["c", "a", "b"],
  "param3": "{\"nestedParam1\":\"value2\",\"nestedParam2\":\"value3\"}",
  "param4": [{"c": 3, "a": 1, "b": 2}, {"c": 30, "a": 10, "b": 20}]
}`;

// Generate a cache key
const key = generateCacheKeyFromJson(jsonObj);

console.log(key); // This will print the generated key in the console

```

## Handling Errors
The function `generateCacheKeyFromJson` will throw an error if it fails to parse the JSON string. You need to catch and handle this error in your application.

```javascript
try {
  const key = generateCacheKeyFromJson(invalidJsonObj);
} catch (error) {
  console.error('Failed to generate key: ', error);
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
MIT

