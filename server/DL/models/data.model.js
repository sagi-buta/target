const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema(
    {
        title: { type: String },
        info: { type: String },
        data : []
    }

)

const dataModel = mongoose.model("data", dataSchema)
module.exports = dataModel