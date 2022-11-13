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
    versionKey: false, // You should be aware of the outcome after set to false
  }

  //   { collection: "users" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
