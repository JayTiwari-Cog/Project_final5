import mongoose from 'mongoose';

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
});

 

  const BlackList = mongoose.model('BlackList', blacklistSchema);
    export default BlackList;
