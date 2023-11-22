const fs = require('fs');

const data1 = 'Contenuto del file di testo 1';

fs.writeFile('./text1.txt', data1, (err) => {
  if (err) {
    console.error(err);
  }
  console.log('<Messaggio file 1 scritto>');


  const data2 = 'Contenuto del file di testo 2';
  
  fs.writeFile('./text2.txt', data2, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('<Messaggio file 2 scritto>');
  })
})