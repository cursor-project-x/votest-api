import db from "../config/db.js";

let dateToInt = +new Date();

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateID = maxLength => {
  let dts = dateToInt.toString();
  let rev = dts.split("").reverse();
  let id = "";

  for (let i = 0; i < maxLength; i++) {
    let index = getRandomInt(0, rev.length - 1);
    id += rev[index];
  }
  return id;
};

const checkIfPollExists = id => {
  db.ref(`polls/${id}`).once("value", snapshot => {
    const id = snapshot.val();
    if (id) {
      return true;
    } else {
      return false;
    }
  });
};

const generateUniqID = maxLength => {
  let id = generateID(maxLength / 2) + "-" + generateID(maxLength / 2),
    counter = 0;
  while (checkIfPollExists(id)) {
    id = generateID(maxLength / 2) + "-" + generateID(maxLength / 2);
    counter++;
    if (counter == 5) {
      console.log("Can't create uniq ID!");
      break;
    }
  }
  return id;
};

const getUniqID = maxLength => {
  return generateUniqID(maxLength);
};

module.exports = getUniqID;
