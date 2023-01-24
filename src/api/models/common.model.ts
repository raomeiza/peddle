import mongoose from "mongoose";

const userBasics:object = new mongoose.Schema({
  firstname: {
    type: String,
    max: 50,
  },
  lastname: {
    type: String,
    max: 50,
  },
  email: {
    type: String,
    max: 50,
    unique: true,
    index: true,
    sparse: true,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    trim: true,
    max: 15,
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  profile_pic: {
    type: String,
    max: 150
  }
});
export default userBasics;
