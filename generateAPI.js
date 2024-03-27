const crypto = require('crypto');

// Generate a random API key
const apiKey = crypto.randomBytes(32).toString('hex');

console.log(apiKey);