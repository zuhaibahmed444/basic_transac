const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  amount : { type : String , required: true},
  transactionType : {type : String , required :true},
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);
