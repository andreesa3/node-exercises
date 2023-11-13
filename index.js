const crypto = require('crypto');

// Genero i caratteri
const randomID = crypto.randomBytes(8).toString('hex');

console.log(randomID)