const players = ['Joe', 'Caroline', 'Sabrina'];

const luckyDraw = (player) => {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));
    if (win) {
      resolve(`${player} won`);
    } else {
      reject(`${player} lost`);
    }
  });
};

const getResults = async () => {
  for (const player of players) {
    try {
      const result = await luckyDraw(player);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
};

getResults();
