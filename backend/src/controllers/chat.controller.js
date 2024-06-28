import asyncHandler from '../utils/asyncHandler.js';
import Chat from '../models/chat.model.js';
import User from '../models/user.model.js';

export const accessChat = asyncHandler(async (req, res) => {
  console.log(req.user)
  const { userId } = req.body;
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  
  var isChat = await Chat
    .find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: req.user._id } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).select(
        "users",
        "-password"
      );
      console.log("This is from fetch Chat")
      console.log(FullChat);
      res.status(200).json(FullChat);
    } catch (error) {
      throw new Error(error.message);
    }
  }
});

export const fetchChats = asyncHandler(async (req, res) => {
  console.log("This is from fetch chats")
  console.log(req.user)
  try {
    Chat.find({
      users: {
        $elemMatch: { $eq: req.user._id },
      },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "fullname email",
        });
        res.status(200).send(results);
      });
  } catch (Error) {}
});

export const fetchGroups = asyncHandler(async (req, res) => {
  try {
    const allGroups = await Chat.where("isGroupChat").equals(true);
    res.status(200).send(allGroups);
  } catch (Error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Data is insufficient" });
  }
  var users = JSON.parse(req.body.users);
  console.log("chatController/createGroups: ", req.body);
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({
      _id: groupChat._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (Error) {
    res.status(400);
    throw new Error(Error.message);
  }
});

export const groupExit = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const removed = await Chat.findById()
    .populate("users", "-passwords")
    .populate("groupAdmin", "-password");
  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});


