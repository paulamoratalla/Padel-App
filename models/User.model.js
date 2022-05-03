const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Indica el correo electrónico"],
    },
    name: {
      type: String,
      required: [true, "Indica el nombre de usuario"],
    },
    password: {
      type: String,
      required: true,
    },
    favouriteClubs: [{
      type: Schema.Types.ObjectId,
      ref: 'Club'
    }],
    role: {
      type: String,
      enum: ['USER', 'ADMIN', 'MOD'],
      default: 'USER'
    },
    avatar: {
      type: String,
      default: "https://i.stack.imgur.com/l60Hf.png"
    },
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],

  },

  {

    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
