import mongoose, { Schema } from 'mongoose';

const FixtureSchema = new Schema({
  homeTeamId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Team',
  },
  awayTeamId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Team',
  },
  homeTeamScore: {
    type: Number,
  },
  awayTeamScore: {
    type: Number,
  },
  matchDate: {
    type: Date,
  },
  isPlayed: {
    type: Boolean,
    default: false,
  },
});
const Fixture = mongoose.model('Fixture', FixtureSchema);
export default Fixture;
