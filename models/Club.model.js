const { Schema, model } = require("mongoose");

const clubSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Indica el nombre del centro"],
        },
        address: {
            street: {
                type: String
            },
            city: {
                type: String
            },
            zip: {
                type: Number
            },
        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
        image: {
            type: String
        },
        numberOfFields: {
            type: Number
        },
        web: {
            type: String
        },
        phone: {
            type: String
        },
        schedule: {
            weekdays: {
                from: {
                    type: String,
                },
                to: {
                    type: String,
                },
            },
            weekends: {
                from: {
                    type: String,
                },
                to: {
                    type: String,
                },
            },
            holidays: {
                from: {
                    type: String,
                },
                to: {
                    type: String,
                },
            },
        }
    },

    {
        timestamps: true,
    }
);

const Club = model("Club", clubSchema);
Club.syncIndexes()

module.exports = Club;
