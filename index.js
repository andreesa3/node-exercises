const fs = require('fs');

const data = 'Contenuto del file di testo 1';

fs.writeFile('./text1.txt', data, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('<Messaggio scritto>');
})