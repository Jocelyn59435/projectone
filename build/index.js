"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var morgan_1 = __importDefault(require("morgan"));
var port = 5000;
var app = express_1.default();
app.use(morgan_1.default('combined'));
app.use('/api', index_1.default);
app.get('/', function (req, res) {
    res.send('Welcome to image process API.');
});
app.listen(port, function () {
    console.log("Listening on " + port);
});
exports.default = app;
