const players = ['Joe', 'Caroline', 'Sabrina'];

const luckyDraw = (player) => {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    if (win) {
      resolve(`${player} won!`);
    } else {
      reject(`${player} lost!`);
    }
  })
}

players.forEach((player) => {
  luckyDraw(player)
    .then(data => console.log(data))
    .catch(err => console.error(err))
});