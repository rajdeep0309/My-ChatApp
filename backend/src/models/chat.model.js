import mongoose from "mongoose";
// const chatSchema=new mongoose.Schema(
//     {
//         sender:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref:'User',
//             required:true,
//         },
//         receiver:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref:'User',
//             required:true,
//         },
//         message:{
//             type:String,
//             required:true,
//         },
//         isRead:{
//             type:Boolean,
//             default:false,
//         },
//     },
//     {
//         timestamps:true,
//     }
// );
// const Chat=mongoose.model('Chat',chatSchema);
const chatModel =new mongoose.Schema(
  {
    chatName: { type: String },
    isGroupChat: { type: Boolean },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timeStamp: true }
);
const Chat = mongoose.model("Chat", chatModel);
export default Chat;
