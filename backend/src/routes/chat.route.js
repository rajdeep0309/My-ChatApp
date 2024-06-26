import chatController from "../controllers/chat.controller";
const {
  accessChat,
  fetchChats,
  createGroupChat,
  fetchGroups,
  groupExit,
} = chatController


const { protect } = require('../middlewares/auth.middleware')


const router = express.router();


router.route("/").post(protect,accessChat);
router.route("/").post(protect,fetchChats);
router.route("/createGroup").post(protect,createGroupChat);
router.route("/fetchGroups").get(protect,fetchGroups);
router.route('/groupExit').post(protect,groupExit);


module.exports = router;