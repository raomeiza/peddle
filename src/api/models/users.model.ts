import { Types, Schema, model } from 'mongoose';
import userBasics from './common.model';

const User = model('User', new Schema({
  password: {
    type: String,
    max: 150,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  last_seen: {
    Date,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  emailToken: {
    type: String,
    length: 5,
    default: null,
  },
  passwordResetToken: {
    type: String,
    length: 5,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  blockedBy: {
    type: Types.ObjectId,
    ref: 'Worker',
    default: null,
  },
  blockedAt: {
    type: Date,
    default: null,
  },
  blockedReason: {
    type: String,
    default: null,
  },
}).add(userBasics), 'user');
export default User;
