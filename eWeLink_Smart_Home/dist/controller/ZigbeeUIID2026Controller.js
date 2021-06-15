"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var restApi_1 = require("../apis/restApi");
var ZigbeeDeviceController_1 = __importDefault(require("./ZigbeeDeviceController"));
var ZigbeeUIID2026Controller = /** @class */ (function (_super) {
    __extends(ZigbeeUIID2026Controller, _super);
    function ZigbeeUIID2026Controller(props) {
        var _this = _super.call(this, props) || this;
        _this.entityId = "binary_sensor." + _this.deviceId;
        _this.params = props.params;
        return _this;
    }
    return ZigbeeUIID2026Controller;
}(ZigbeeDeviceController_1.default));
/**
 * @description 更新状态到HA
 */
ZigbeeUIID2026Controller.prototype.updateState = function (_a) {
    var status = _a.motion, battery = _a.battery;
    return __awaiter(this, void 0, void 0, function () {
        var state;
        return __generator(this, function (_b) {
            if (this.disabled) {
                return [2 /*return*/];
            }
            state = status === 1 ? 'on' : 'off';
            if (!this.online) {
                state = 'unavailable';
            }
            // 更新开关
            restApi_1.updateStates(this.entityId + "_motion", {
                entity_id: this.entityId + "_motion",
                state: state,
                attributes: {
                    restored: false,
                    friendly_name: this.deviceName + "-Motion",
                    device_class: 'motion',
                    state: state,
                },
            });
            // 更新电量
            restApi_1.updateStates("sensor." + this.deviceId + "_battery", {
                entity_id: "sensor." + this.deviceId + "_battery",
                state: battery,
                attributes: {
                    restored: false,
                    friendly_name: this.deviceName + "-Battery",
                    device_class: 'battery',
                    unit_of_measurement: '%',
                    state: battery,
                },
            });
            return [2 /*return*/];
        });
    });
};
exports.default = ZigbeeUIID2026Controller;
