const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema(
  {
    _id: {
      type: ObjectId,
      default: function () {
        return new mongoose.Types.ObjectId();
      },
    },
    username: String,
    password: String,
    name: String,
    age: Number,
  },
  {
    methods: {
      createAccessToken() {
        console.log(this.username, " : user name");
      },
    },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }

  //   { collection: "users" }
);

const User = mongoose.model("User", userSchema);
// let user = new User({
//   username: "t",
//   password: "111",
//   name: "test",
//   age: 1,
// });
// user.createAccessToken();
module.exports = User;
