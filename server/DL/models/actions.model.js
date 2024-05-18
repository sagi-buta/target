const mongoose = require('mongoose');
require('./students.model')

const actionsSchema = new mongoose.Schema(
    {
        gender: {
            type: String
        },
        orderSource: {
            type: String
        },
        fundingSource: {
            type: String,
        },
        contactInfo: {
            name: { type: String },
            email: { type: String },
            phone: { type: String }
        },
        name: {
            type: String
        },
        location: {
            type: String,
        },
        locationType: {
            type: { type: String },
            note: { type: String }

        },
        days: [String],
        startTime: {
            type: String,
        },
        endTime: {
            type: String,
        },
        startDate: {
            type: Date,
            default: new Date ()
        },
        endDate: {
            type: Date,
            default: new Date ()
        },
        numSessions: {
            type: String
        },
        studyAcademicHours: {
            type: String
        },
        studyNormalHours: {
            type: String
        },
        studyFormat: {
            format: { type: String },
            link: { type: String },
            note: { type: String }
        },
        status: {
            status: { type: String },
            note: { type: String }
        },
        actionType: {
            type: String
        },
        lecturer: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'admins',
        },
        notes: {
            type: String
        },
        notesP: {
            type: String
        },

        files: [
            {
                fileName: {
                    type: String
                },
                fileType: {
                    type: String,
                },
                size: {
                    type: String
                },
                createdDate: {
                    type: String,
                    default: Date.now
                },

                filePath: {
                    type: String,
                    // required: true
                },

            }
        ],
        finFiles: [
            {
                fileName: {
                    type: String
                },
                fileType: {
                    type: String,
                },
                size: {
                    type: String
                },
                createdDate: {
                    type: String,
                    default: Date.now
                },

                filePath: {
                    type: String,
                    // required: true
                },

            }
        ],
        tasks: [
            {
                name: {
                    type: String
                },
                responsibility: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: 'admins',
                },
                department: {
                    type: String
                },
                deadline: {
                    type: Date
                },
                details: {
                    type: String,
                },
                isDone: {
                    type: Boolean,
                    default: false
                }
            }
        ],
        students: [
            {
                studentId:{type: mongoose.SchemaTypes.ObjectId,ref: 'students'},
                num:{type: String}
            }
        ],
        schedules: [
            {
                date: {
                    type: Date,
                },
                lecturer: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: 'admins',
                },
                comments: {
                    type: String,
                },
                status: {
                    type: String,
                    enum: [""]
                },
                classNum: {
                    type: String,
                },
                numOFOuers: {
                    type: String,
                },

            }
        ]
    }
)

const actionsModel = mongoose.model("actions", actionsSchema)
module.exports = actionsModel