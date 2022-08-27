const assert = require("assert");
const { default: mongoose } = require("mongoose");
const Car = require("../models/car.model");

exports.validateCar = (req, res, next) => {
    const { brand, model, serie, color, licensePlate, mileage } = req.body;

    try {
        brand && assert(typeof brand === "string", "Brand must be a string!");
        model && assert(typeof model === "string", "Model must be a string!");
        serie && assert(typeof serie === "string", "Serie must be a string!");
        color && assert(typeof color === "string", "Color must be a string!");
        licensePlate && assert(typeof licensePlate === "string", "License plate must be a string!");
        mileage && assert(typeof mileage === "number", "Mileage must be a number!");
        next();
    } catch (error) {
        return next({
            status: 400,
            error: error.message
        });
    }
}

exports.getAllCars = async (req, res, next) => {
    const cars = await Car.find();

    res.status(200).json({
        status: 200,
        results: cars
    });

    res.end();
}

exports.createCar = (req, res, next) => {
    const carSpecs = req.body;

    const car = await new Car({
        ...carSpecs
    }).save(async (err) => {
        if(err) {
            return next({
                status: 400,
                errors: await errorHandling(err)
            });
        } else {
            res.status(201).json({
                status: 201,
                message: "Car has been created!"
            });
        
            res.end();
        }
    });
}

exports.getCar = async (req, res, next) => {
    const { carId } = req.params;

    if(!mongoose.isValidObjectId(carId)) {
        return next({
            status: 400,
            error: `${carId} isn't a valid ObjectId!`
        });
    } else {
        const car = await Car.findById(carId);

        if(car) {
            res.status(200).json({
                status: 200,
                result: car
            });
        } else {
            return next({
                status: 400,
                error: `There isn't a car with the ID of ${carId}!`
            });
        }
    }
}

exports.updateCar = async (req, res, next) => {
    const { carId } = req.params;
    const newCarSpecs = req.body;

    if(!mongoose.isValidObjectId(carId)) {
        return next({
            status: 400,
            error: `${carId} isn't a valid ObjectId!`
        });
    } else {
        const car = await Car.findByIdAndUpdate(carId, newCarSpecs, { runValidators: true, new: true }).catch(async (err) => {
            if(err) {
                return next({
                    status: 400,
                    errors: await errorHandling(err)
                });
            }
        });

        if(car) {
            res.status(200).json({
                status: 200,
                message: "Car has been updated!",
                result: car
            });
        
            res.end();
        } else {
            return next({
                status: 400,
                error: `There isn't a car with the ID of ${carId}!`
            });
        }
    }
}

exports.deleteCar = async (req, res, next) => {
    const { carId } = req.params;

    if(!mongoose.isValidObjectId(carId)) {
        return next({
            status: 400,
            error: `${carId} isn't a valid ObjectId!`
        });
    } else {
        const car = await Car.findByIdAndDelete(carId);

        if(car) {
            res.status(200).json({
                status: 200,
                message: "Car has been deleted!"
            });
        } else {
            return next({
                status: 400,
                error: `There isn't a car with the ID of ${carId}!`
            });
        }
    }
}

const errorHandling = async (err) => {
    const errors = {};

    if(err.errors.brand) {
        errors.brandErr = err.errors.brand.properties.message;
    }

    if(err.errors.model) {
        errors.modelErr = err.errors.model.properties.message;
    }

    if(err.errors.serie) {
        errors.serieErr = err.errors.serie.properties.message;
    }

    if(err.errors.color) {
        errors.colorErr = err.errors.color.properties.message;
    }

    if(err.errors.licensePlate) {
        errors.licensePlateErr = err.errors.licensePlate.properties.message;
    }

    if(err.errors.mileage) {
        errors.mileageErr = err.errors.mileage.properties.message;
    }

    return errors;
}