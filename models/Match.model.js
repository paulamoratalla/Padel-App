const { Schema, model } = require("mongoose");

const matchSchema = new Schema(
    {
        result: {
            set1: {
                team1: {
                    type: Number,
                    default: null
                },
                team2: {
                    type: Number,
                    default: null
                },
            },
            set2: {
                team1: {
                    type: Number,
                    default: null
                },
                team2: {
                    type: Number,
                    default: null
                },
            },
            set3: {
                team1: {
                    type: Number,
                    default: null
                },
                team2: {
                    type: Number,
                    default: null
                },
            },
        },
        date: {
            type: Date
        },
        time: {
            type: Date
        },
        players: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
        club: {
            type: Schema.Types.ObjectId,
            ref: 'Club'
        },
        price: {
            type: Number
        },
        genre: {
            type: String,
            enum: ['Mixto', 'Femenino', 'Masculino']
        },
    },

    {

        timestamps: true,
    }
);

const Match = model("Match", matchSchema);
Match.syncIndexes()

module.exports = Match;