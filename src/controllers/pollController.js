import db from "../config/db.js";
import getUniqID from "../config/IDGenerator";

const GETlistOfAllPolls = async (req, res) => {
  try {
    const base = await db.ref("polls/").once("value");
    const response = base.val();

    if (!response) {
      res.status(404).json({ response, status: "Error 404 Not Found" });
      console.log("Synchronization failed");
    } else {
      res.status(200).json({ response, status: "Synchronization succeeded" });
      console.log("Synchronization succeeded");
    }
  } catch (error) {
    res.status(404).send(`ERROR ::: ${error}`);
    console.log(`ERROR ::: ${error}`);
  }
};

const GETpollID = async (req, res) => {
  try {
    const base = await db.ref(`polls/${req.params.id}`).once("value");
    const response = base.val();

    if (!response) {
      res.status(404).json({ response, status: "Error 404 Not Found" });
      console.log("Synchronization failed");
    } else {
      res.status(200).json({ response, status: "Synchronization succeeded" });
      console.log("Synchronization succeeded");
    }
  } catch (error) {
    res.status(404).send(`ERROR ::: ${error}`);
    console.log(`ERROR ::: ${error}`);
  }
};

const POSTCreatePoll = (req, res) => {
  let uid = getUniqID(6),
    createDate = new Date().toString();

  const { type, question, answers } = req.body;

  let newAnswers = answers.reduce((previousValue, currentItem, index) => {
    previousValue["ans" + index] = {
      answer: currentItem,
      counter: 0
    };
    return previousValue;
  }, {});

  db.ref(`polls/${uid}`).set(
    {
      question: question,
      answers: newAnswers,
      type: type,
      timestamp: createDate
    },
    error => {
      if (error) {
        res.status(500).send(`ERROR ::: ${error}`);
      } else {
        res
          .status(201)
          .json({ id: uid, status: `Poll created, your poll id: ${uid}` });
      }
    }
  );
};

const PUTPollAnswers = async (req, res) => {
  try {
    const base = db.ref(`polls/${req.params.id}/answers/${req.params.ansid}`);
    const pollsSnapshot = await base.once("value");
    const response = pollsSnapshot.val();

    if (!response) {
      res.status(404).json({
        response,
        status: "Error 404 Not Found"
      });
      console.log("Synchronization failed");
    } else {
      base.update({
        counter: ++response.counter
      });
      const updatedPollsSnapshot = await base.once("value");
      const updatedResponse = updatedPollsSnapshot.val();
      res
        .status(200)
        .json({ updatedResponse, status: "Poll updated successfully" });
      console.log("Synchronization succeeded");
    }
  } catch (error) {
    res.status(404).send(`ERROR ::: ${error}`);
    console.log(`ERROR ::: ${error}`);
  }
};

module.exports = {
  GETlistOfAllPolls: GETlistOfAllPolls,
  GETpollID: GETpollID,
  POSTCreatePoll: POSTCreatePoll,
  PUTPollAnswers: PUTPollAnswers
};
