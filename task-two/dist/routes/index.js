"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
var router = express_1.default.Router();
/* GET home page. */
router.get('/fetchRecords', function (req, res, next) {
    fs_1.default.readFile("./database.json", "utf8", (err, fileData) => {
        if (err) {
            console.log(Error);
        }
        else {
            res.status(200).json({
                status: "success",
                data: JSON.parse(fileData)
            });
        }
    });
});
/* GET data by ID. */
router.get('/fetchRecords/:id', (req, res) => {
    fs_1.default.readFile("./database.json", "utf8", (err, fileData) => {
        const { id } = req.params;
        const parsedData = JSON.parse(fileData);
        const findUser = parsedData.find((user) => user.id === parseInt(id));
        if (!findUser) {
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ status: 'fail', message: `data no found for id: ${id}` }));
        }
        else {
            res.writeHead(200, { 'content-type': 'application/json' });
            res.end(JSON.stringify(findUser));
        }
    });
});
/* POST home page. */
router.post('/calculate', (req, res) => {
    try {
        const fileData = fs_1.default.readFileSync("./database.json", "utf8");
        const dimension = req.body.dimension;
        const shape = req.body.shape.toLowerCase();
        const parsedData = JSON.parse(fileData);
        const lastID = parsedData[parsedData.length - 1].id;
        if (shape == "rectangle") {
            if (typeof dimension == "object") {
                let len = Object.keys(dimension).length;
                if (+len != 2) {
                    res.status(400).send("Please provide values for only Length and Breath");
                }
                else {
                    let { length, breadth } = dimension;
                    if (typeof length == "number" && typeof breadth == "number") {
                        let rectangleArea = Number((length * breadth).toFixed(2));
                        let newData = { id: lastID + 1, shape: shape, dimension: dimension, area: rectangleArea, createdAt: new Date(Date.now()) };
                        parsedData.push(newData);
                        fs_1.default.writeFileSync("./database.json", JSON.stringify(parsedData, null, 2));
                        res.status(200).json({
                            status: 'success',
                            data: newData
                        });
                    }
                    else if (typeof length == "string" || typeof breadth == "string") {
                        let lengthS = Number(length);
                        let breadthS = Number(breadth);
                        if ((isNaN(lengthS)) || (isNaN(breadthS))) {
                            return res.send("The Length Or Breadth Provided Is Not A Number");
                        }
                        else {
                            let rectangleArea = Number((lengthS * breadthS).toFixed(2));
                            let newData = { id: lastID + 1, shape: shape, dimension: dimension, area: rectangleArea, createdAt: new Date(Date.now()) };
                            parsedData.push(newData);
                            fs_1.default.writeFileSync("./database.json", JSON.stringify(parsedData, null, 2));
                            res.status(201).json({
                                status: 'success',
                                data: newData
                            });
                        }
                    }
                    else {
                        res.send("You Must Provided A Validated value For The Length And Breadth Of The Rectangle");
                    }
                }
            }
            else {
                return res.send("The Length And Breadth Of The Rectangle Must Be Provided");
            }
        }
        else if (shape == "square") {
            if (typeof dimension == "number") {
                if (typeof dimension == "number") {
                    let squareArea = Number((dimension * dimension).toFixed(2));
                    let newData = { id: lastID + 1, shape: shape, dimension: dimension, area: squareArea, createdAt: new Date(Date.now()) };
                    parsedData.push(newData);
                    fs_1.default.writeFileSync("./database.json", JSON.stringify(parsedData, null, 2));
                    res.status(200).json({
                        status: 'success',
                        data: newData
                    });
                }
            }
            else if (typeof dimension == "string") {
                let dimensionS = Number(dimension);
                if (isNaN(dimensionS)) {
                    return res.send("The Side(length) Is Not A Number");
                }
                else {
                    let squareArea = Number((dimensionS * dimensionS).toFixed(2));
                    let newData = { id: lastID + 1, shape: shape, dimension: dimension, area: squareArea, createdAt: new Date(Date.now()) };
                    parsedData.push(newData);
                    fs_1.default.writeFileSync("./database.json", JSON.stringify(parsedData, null, 2));
                    res.status(200).json({
                        status: 'success',
                        data: newData
                    });
                }
            }
            else {
                return res.send("Please provide only the Side(length) of a Square");
            }
        }
        else if (shape == "circle") {
            if (typeof dimension == "number") {
                if (typeof dimension == "number") {
                    let circleArea = Number((Math.PI * dimension * dimension).toFixed(2));
                    let newData = { id: lastID + 1, shape: shape, dimension: dimension, area: circleArea, createdAt: new Date(Date.now()) };
                    parsedData.push(newData);
                    fs_1.default.writeFileSync("./database.json", JSON.stringify(parsedData, null, 2));
                    res.status(200).json({
                        status: 'success',
                        data: newData
                    });
                }
            }
            else if (typeof dimension == "string") {
                let dimensionS = Number(dimension);
                if (isNaN(dimensionS)) {
                    return res.send("The Radius Is Not A Number");
                }
                else {
                    let circleArea = Number((Math.PI * dimensionS * dimensionS).toFixed(2));
                    let newData = { id: lastID + 1, shape: shape, dimension: dimension, area: circleArea, createdAt: new Date(Date.now()) };
                    parsedData.push(newData);
                    fs_1.default.writeFileSync("./database.json", JSON.stringify(parsedData, null, 2));
                    res.status(200).json({
                        status: 'success',
                        data: newData
                    });
                }
            }
            else {
                return res.send("Please provide only the Radius of a Circle");
            }
        }
        else if (shape == "triangle") {
            if (typeof dimension == "object") {
                let len = Object.keys(dimension).length;
                if (+len != 3) {
                    res.status(400).send("Please provide values for Length, height and Breath of a Triangle");
                }
                else {
                    let { length, breadth, height } = dimension;
                    if (typeof length == "number" && typeof breadth == "number" && typeof height == "number") {
                        let semiP = ((length + breadth + height) / 2);
                        let triangleArea = Number((Math.sqrt((semiP) * (semiP - length) * (semiP - breadth) * (semiP - height))).toFixed(2));
                        let newData = { id: lastID + 1, shape: shape, dimension: dimension, area: triangleArea, createdAt: new Date(Date.now()) };
                        parsedData.push(newData);
                        fs_1.default.writeFileSync("./database.json", JSON.stringify(parsedData, null, 2));
                        res.status(200).json({
                            status: 'success',
                            data: newData
                        });
                    }
                    else if (typeof length == "string" || typeof breadth == "string" || typeof height == "string") {
                        let lengthS = Number(length);
                        let breadthS = Number(breadth);
                        let heightS = Number(height);
                        if ((isNaN(lengthS)) || (isNaN(breadthS)) || (isNaN(heightS))) {
                            return res.send("The Length Or Breadth or Height Provided Is Not A Number");
                        }
                        else {
                            let semiP = ((lengthS + breadthS + heightS) / 2);
                            let triangleArea = Number(((Math.sqrt(semiP)) * (semiP - lengthS) * (semiP - breadthS) * (semiP - heightS)).toFixed(2));
                            let newData = { id: lastID + 1, shape: shape, dimension: dimension, area: triangleArea, createdAt: new Date(Date.now()) };
                            parsedData.push(newData);
                            fs_1.default.writeFileSync("./database.json", JSON.stringify(parsedData, null, 2));
                            res.status(201).json({
                                status: 'success',
                                data: newData
                            });
                        }
                    }
                    else {
                        res.send("You Must Provided A Validated value For The Length, Breadth and Heigth Of The Triangle");
                    }
                }
            }
            else {
                return res.send("The Length, Breadth and Heigth Of The Triangle Must Be Provided");
            }
        }
        else {
            res.send("Please provide any of the following shapes: Rectangle, Square, Circle, Triangle");
        }
    }
    catch (err) {
        const fileData = fs_1.default.readFileSync("./database.json", "utf8");
        const data = req.body;
        const parsedData = JSON.parse(fileData);
        const newData = Object.assign(Object.assign({ id: 1 }, data), { createdAt: new Date(Date.now()) });
        parsedData.push(newData);
        fs_1.default.writeFileSync("./database.json", JSON.stringify(parsedData, null, 2));
        res.status(201).json({
            status: 'success',
            data: newData
        });
    }
});
exports.default = router;
