const express = require("express");
const app = express();
const port = 3000;
const carRouter = require("./src/routes/car.routes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(carRouter);

app.all("*", (req, res) => {
    res.status(404).json({
        status: 404,
        result: "End-point not found"
    });
    res.end();
});

app.use((err, req, res, next) => {
    res.status(err.status).json(err);
});

app.listen(port, () => {
    console.log("App listening on localhost:" + port)
})

module.exports = app;