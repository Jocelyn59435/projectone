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
var index_1 = __importDefault(require("../routes/index"));
var images_1 = __importDefault(require("../routes/api/images"));
var supertest_1 = __importDefault(require("supertest"));
var requestOne = supertest_1.default(images_1.default);
var requestTwo = supertest_1.default(index_1.default);
var utilone_1 = require("../utils/utilone");
var fullPath = "./assets/full/flower6.jpg";
var thumbPath = "./assets/thumb/flower6_resize.jpg";
var img = utilone_1.getFile(fullPath);
it('should whether flower6.jpg exists and return true', function () {
    expect(utilone_1.checkFile(fullPath)).toBeTruthy();
});
it('should get flower6.jpg', function () {
    expect(utilone_1.getFile(fullPath)).toBeTruthy();
});
it('should get dimensions of flower6.jpg', function () {
    expect(utilone_1.getDimensions(img)).toBeTruthy();
});
it('should throw an error when deleting an file which does not exist', function () {
    expect(utilone_1.deleteFile('./assets/thumb/ajax.jpg')).toThrowError;
});
it('expects to be resolved', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utilone_1.cropImage("./assets/full/qiaoyin.jpg", "./assets/thumb/qiaoyin_resize.jpg", 300, 500)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe('Test endpoint response', function () {
    it('gets the api endpoint', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, requestTwo.get('/')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('gets the images endpoint', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, requestOne.get('/?filename=flower6&width=300&height=600')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
});
