const mongoose = require("../../database/db_conn");

const licensePlateRegex = /(\w{2}-\d{2}-\d{2})|(\d{2}-\d{2}-\w{2})|(\d{2}-\w{2}-\d{2})|(\w{2}-\d{2}-\w{2})|(\w{2}-\w{2}-\d{2})|(\d{2}-\w{2}-\w{2})|(\d{2}-\w{3}-\d{1})|(\d{1}-\w{3}-\d{2})|(\w{2}-\d{3}-\w{1})|(\w{1}-\d{3}-\w{2})|(\w{3}-\d{2}-\w{1})|(\d{1}-\w{2}-\d{3})/;

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, "Every car belongs to a brand!"],
    },
    model: {
        type: String,
        required: [true, "Every car belongs to a model!"],
    },
    serie: {
        type: String,
        required: [true, "Every car belongs to a serie!"],
    },
    color: {
        type: String,
        required: [true, "Every car has a color!"],
        lowercase: true
    },
    licensePlate: {
        type: String,
        required: [true, "Every car needs to have a license plate!"],
        validate: {
            validator: (value) => (
                licensePlateRegex.test(value)
            ),
            message: "{VALUE} is not a correct license plate!"
        },
        uppercase: true
    },
    mileage: {
        type: Number,
        required: [true, "Every car has a mileage!"],
        min: [0, "Your mileage can't be below 0!"]
    }
});

module.exports = mongoose.model("Car", carSchema);