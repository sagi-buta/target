const mongoose = require('mongoose');


const studentsSchema = new mongoose.Schema(
  {
    actions: [
      {type: mongoose.SchemaTypes.ObjectId,ref: 'actions'}
    ],
    personalId: { type: String },
    name: { type: String },
    city: { type: String },
    phone: { type: String },
    email: { type: String },
    notes: { type: String },
  }
)

const studentsModel = mongoose.model("students", studentsSchema)
module.exports = studentsModel