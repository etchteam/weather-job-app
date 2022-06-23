const NodeCache = require("node-cache");

const cache = new NodeCache();

function getCachedData(key) {
    return cache.get(key);
}

function cacheData(key, data, ttl) {
    cache.set(key, data, ttl);
}

module.exports = {
    getCachedData,
    cacheData
}
