const crypto = require('crypto');

// Genero i caratteri
const randomChars = crypto.randomBytes(8);

// Li converto in modo che siano leggibili
const id = randomChars.toString('hex')
console.log(id)