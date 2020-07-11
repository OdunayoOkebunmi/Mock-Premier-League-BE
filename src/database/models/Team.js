import mongoose, { Schema } from 'mongoose';

const TeamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Team = mongoose.model('Team', TeamSchema);
export default Team;
