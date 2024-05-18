const mongoose = require('mongoose');


const adminsSchema = new mongoose.Schema(
  {
    name: { type: String },
    phone: { type: String },
    email: { type: String ,uniqe :true},
    adminHash: { type: String },
    adminSalt: { type: String },
    resetLinkToken: { type: String },
    resetLinkExpires: { type: Date},
    adminCreated: { type: Date, default: Date.now },
    adminLastActive: { type: Date },
    adminStatus: { type: Boolean, default: true },
    actions:[{
      type: mongoose.SchemaTypes.ObjectId,
      ref: "actions",
  }],
    role: {
      type: String,
      enum: ["admin", "advisers","administration","teacher"],
      default: "administration"

    }
  }
)

const adminsModel = mongoose.model("admins", adminsSchema)
module.exports = adminsModel