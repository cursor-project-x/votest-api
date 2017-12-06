import express from "express";
import pollController from "../controllers/pollController.js";

const router = express.Router();

router.get("/", pollController.GETlistOfAllPolls);

router.get("/poll/:id", pollController.GETpollID);

router.post("/create", pollController.POSTCreatePoll);

router.put("/poll/:id/:ansid", pollController.PUTPollAnswers);

module.exports = router;
