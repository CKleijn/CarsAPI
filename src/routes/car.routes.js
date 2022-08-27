const express = require("express");
const router = express.Router();
const {getAllCars, createCar, getCar, updateCar, deleteCar, validateCar} = require("../controllers/car.controller");

router.get("/api/cars", getAllCars);

router.post("/api/car", validateCar, createCar);

router.route("/api/car/:carId")
    .get(getCar)
    .put(validateCar, updateCar)
    .delete(deleteCar);

module.exports = router;