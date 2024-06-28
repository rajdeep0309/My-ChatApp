import express from 'express';
import {
  accessChat,
  fetchChats,
  createGroupChat,
  groupExit,
  fetchGroups,
} from '../controllers/chat.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/").post(verifyJWT, accessChat);
router.route("/").get(verifyJWT, fetchChats);
router.route("/createGroup").post(verifyJWT, createGroupChat);
router.route("/fetchGroups").get(verifyJWT, fetchGroups);
router.route("/groupExit").put(verifyJWT, groupExit);

export default router;
