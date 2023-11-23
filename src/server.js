"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var morgan_1 = require("morgan");
require("express-async-errors");
var app = (0, express_1["default"])();
var port = process.env.PORT || 3000;
dotenv_1["default"].config();
var planets = [
    { id: 1, name: "Mercury" },
    { id: 2, name: "Venus" },
    { id: 3, name: "Earth" },
    { id: 4, name: "Mars" },
    { id: 5, name: "Jupiter" },
    { id: 6, name: "Saturn" },
    { id: 7, name: "Uranus" },
];
app.use((0, morgan_1["default"])("dev"));
app.use(express_1["default"].json());
app.get("/api/planets", function (_, res) {
    res.status(200).json(planets);
});
app.get("/api/planets/:id", function (req, res) {
    var id = req.params.id;
    var planet = planets.find(function (p) { return p.id === Number(id); });
    res.status(200).json(planet);
});
app.post("/api/planets", function (req, res) {
    var _a = req.body, id = _a.id, name = _a.name;
    if (!id || !name) {
        return res.status(400).json({ error: "Both 'id' and 'name' are required." });
    }
    var existingPlanet = planets.find(function (p) { return p.id === id; });
    if (existingPlanet) {
        return res.status(400).json({ error: "A planet with the provided ID already exists." });
    }
    var newPlanet = { id: id, name: name };
    planets = __spreadArray(__spreadArray([], planets, true), [newPlanet], false);
    console.log(planets);
    res.status(201).json({ msg: "Planet created" });
});
app.listen(port, function () {
    console.log("Server is listening on http://localhost:".concat(port));
});
