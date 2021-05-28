"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var utilone_1 = require("../../utils/utilone");
var images = express_1.default.Router();
// process get request from images route
images.get('/', function (req, res) {
    var queryPara = req.query;
    // check the number of query parameters, if it is not 3, return error message
    if (Object.keys(req.query).length !== 3) {
        res.end('Please provide all three parameters: filename, width and height.');
        return;
    }
    // get parameters from get request
    var filename = queryPara.filename;
    var width = parseInt(queryPara.width);
    var height = parseInt(queryPara.height);
    // define paths for full image and thumb image
    var fullPath = "./assets/full/" + filename + ".jpg";
    var thumbPath = "./assets/thumb/" + filename + "_" + width + "_" + height + "_resize.jpg";
    // check filename parameter
    if (!utilone_1.checkFile(fullPath) || req.query.filename === null) {
        console.log('aa');
        res.end("Please provide validate filename including\n  \n    flower1\n    flower2\n    flower3\n    flower4\n    flower5\n    flower6\n    flower7\n    flower8\n    flower9\n    qiaoyin\n     ");
        return;
    }
    // check width parameter
    if (isNaN(width) || req.query.width === null) {
        res.end('Please provide validate width (should be number).');
        return;
    }
    // check height parameter
    if (isNaN(height) || req.query.height === null) {
        res.end('Please provide validate height (should be number).');
        return;
    }
    // first check whether the file exists or not
    if (utilone_1.checkFile(thumbPath)) {
        var img = utilone_1.getFile(thumbPath);
        // if file exists, send the cached one
        res.end(img, 'binary');
        return;
    }
    // if there is not cached one, crop, save and send the image
    (function () {
        return __awaiter(this, void 0, void 0, function () {
            var img, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, utilone_1.cropImage(fullPath, thumbPath, width, height)];
                    case 1:
                        _a.sent();
                        img = utilone_1.getFile(thumbPath);
                        res.end(img, 'binary');
                        return [2 /*return*/];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    })();
});
exports.default = images;
