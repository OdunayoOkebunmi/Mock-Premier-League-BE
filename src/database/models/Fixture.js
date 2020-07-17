import mongoose, { Schema } from 'mongoose';

const FixtureSchema = new Schema({
  time: {
    type: String,
    required: true,
  },
  home: {
    type: Schema.Types.String,
    ref: 'name',
  },
  away: {
    type: Schema.Types.String,
    ref: 'name',
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'completed'],
  },
  slug: {
    type: String,
    required: true,
  },
});
const Fixture = mongoose.model('Fixture', FixtureSchema);
export default Fixture;
