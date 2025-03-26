// src/cache.js
/**
 * This module provides caching functionality to store API responses locally
 * to reduce API calls and improve performance
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory path using ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CACHE_FILE = path.join(__dirname, '../data/cache.json');
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Initialize the cache file if it doesn't exist
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch | MDN: try...catch}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function | MDN: async function}
 * @see {@link https://nodejs.org/api/fs.html#fs_promises_api | Node.js: fs/promises}
 */
export async function initializeCache() {
  // CHALLENGE 7: Implement initializeCache function
  // 1. Try to access the CACHE_FILE using fs.access
  // 2. If the file doesn't exist (access throws an error), create it:
  //    - Make sure the directory exists (get the directory using path.dirname)
  //    - Create the directory if needed using fs.mkdir with { recursive: true }
  //    - Write an empty object as JSON to the file using fs.writeFile
  // 3. Handle any errors appropriately

  try {
    fs.access(CACHE_FILE);
  }
  catch (error) {
    const dirPath = path.dirname(CACHE_FILE);
    try {
      fs.access(dirPath);
    }
    catch {
      fs.mkdir(dirPath, { recursive: true });
    }
    fs.writeFile(CACHE_FILE, JSON.stringify({}, null, 2));
  }
}

/**
 * Get data from cache if it exists and hasn't expired
 *
 * @param {string} key - Cache key
 * @returns {Promise<Object|null>} - Cached data or null if not found or expired
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse | MDN: JSON.parse}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now | MDN: Date.now}
 */
export async function getFromCache(key) {
  // CHALLENGE 8: Implement getFromCache function
  // 1. Read the cache file using fs.readFile
  // 2. Parse the JSON data
  // 3. Check if the key exists in the cache
  // 4. If it exists, check if it has expired by comparing:
  //    - Current time (Date.now())
  //    - Cached item's timestamp
  //    - CACHE_DURATION
  // 5. If not expired, return the cached data
  // 6. If expired or not found, return null
  // 7. Handle any errors appropriately and return null

  try {
    const cacheData = JSON.parse(await fs.readFile(CACHE_FILE, 'utf8'));
    if (cacheData[key]) {

      const { timestamp, data } = undefined;
      const now = Date.now();

      if (now - timestamp < CACHE_DURATION) {
        console.log(`Cache hit for key: ${key}`);
        return data;
      }
      console.log(`Cache expired for key: ${key}`);
      return null;
    }
  }
  catch (error) {
    console.error('Error reading from cache:', error.message);
    return null;
  }
}

/**
 * Save data to cache with a timestamp
 *
 * @param {string} key - Cache key
 * @param {Object} data - Data to cache
 * @returns {Promise<boolean>} - True if successfully saved to cache
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify | MDN: JSON.stringify}
 */
export async function saveToCache(key, data) {
  // CHALLENGE 9: Implement saveToCache function
  // 1. Make sure cache is initialized by calling initializeCache
  // 2. Read current cache file using fs.readFile
  // 3. Parse the JSON data
  // 4. Add the new entry with:
  //    - Current timestamp (Date.now())
  //    - The data to be cached
  // 5. Write the updated cache back to the file
  // 6. Return true on success
  // 7. Handle any errors and return false on failure

  // YOUR CODE HERE
}

/**
 * Clear expired entries from the cache
 *
 * @returns {Promise<number>} - Number of entries removed
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete | MDN: delete operator}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in | MDN: for...in}
 */
export async function clearExpiredCache() {
  // CHALLENGE 10: Implement clearExpiredCache function
  // 1. Make sure cache is initialized
  // 2. Read and parse the cache file
  // 3. Get the current time using Date.now()
  // 4. Loop through each key in the cache
  // 5. Check if each entry has expired
  // 6. If expired, delete the entry and increment a counter
  // 7. Write the updated cache back to file if any entries were removed
  // 8. Return the count of removed entries
  // 9. Handle any errors appropriately

  // YOUR CODE HERE
}

/**
 * Get a cached API response or fetch it if not available
 *
 * @param {string} key - Cache key
 * @param {Function} fetchFn - Function to call if cache miss
 * @param {boolean} forceRefresh - Force a fresh fetch even if cached
 * @returns {Promise<Object>} - Data from cache or fresh fetch
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function | MDN: async function}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises | MDN: Using promises}
 */
export async function getCachedOrFetch(key, fetchFn, forceRefresh = false) {
  // CHALLENGE 11: Implement getCachedOrFetch function
  // 1. If not forcing a refresh, try to get data from cache using getFromCache
  // 2. If data was found in cache, return it
  // 3. If no data in cache or forcing refresh, call the fetchFn() to get fresh data
  // 4. Save the fresh data to cache using saveToCache
  // 5. Return the fresh data
  // 6. Add error handling that tries to use expired cache as fallback if fetch fails
  //    (you can directly read the cache file again to get even expired data)

  // YOUR CODE HERE
}

export default {
  initializeCache,
  getFromCache,
  saveToCache,
  clearExpiredCache,
  getCachedOrFetch
};
