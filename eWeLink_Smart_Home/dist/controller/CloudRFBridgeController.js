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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CloudDeviceController_1 = __importDefault(require("./CloudDeviceController"));
var restApi_1 = require("../apis/restApi");
var coolkit_ws_1 = __importDefault(require("coolkit-ws"));
var CloudRFBridgeController = /** @class */ (function (_super) {
    __extends(CloudRFBridgeController, _super);
    function CloudRFBridgeController(params) {
        var _a;
        var _this = _super.call(this, params) || this;
        _this.uiid = 28;
        _this.entityId = "remote." + params.deviceId;
        _this.params = params.params;
        _this.uiid = params.extra.uiid;
        if ((_a = params.tags) === null || _a === void 0 ? void 0 : _a.zyx_info) {
            params.tags.zyx_info.forEach(function (item) {
                var _a;
                var name = item.name, buttonName = item.buttonName, remote_type = item.remote_type;
                var domain = +remote_type < 6 ? 'remote' : 'alert';
                var suffix = buttonName.reduce(function (prev, curr) {
                    var _a = __read(Object.entries(curr), 1), key = _a[0];
                    return prev + key;
                }, '');
                var entityId = domain + "." + _this.deviceId + "_" + suffix;
                (_a = _this.zxyInfo) === null || _a === void 0 ? void 0 : _a.set(entityId, item);
            });
        }
        return _this;
    }
    return CloudRFBridgeController;
}(CloudDeviceController_1.default));
CloudRFBridgeController.prototype.updateSwitch = function (status) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, coolkit_ws_1.default.updateThing({
                        ownerApikey: this.apikey,
                        deviceid: this.deviceId,
                        params: {
                            switch: status,
                        },
                    })];
                case 1:
                    res = _a.sent();
                    if (res.error === 0) {
                        this.updateState(status);
                        this.params.switch = status;
                    }
                    return [2 /*return*/];
            }
        });
    });
};
/**
 * @description 更新状态到HA
 */
CloudRFBridgeController.prototype.updateState = function (status) {
    return __awaiter(this, void 0, void 0, function () {
        var state, _a, _b, key, tmp, attributes;
        var e_1, _c;
        return __generator(this, function (_d) {
            if (this.disabled || !this.zxyInfo) {
                return [2 /*return*/];
            }
            state = status;
            if (!this.online) {
                state = 'unavailable';
            }
            try {
                for (_a = __values(this.zxyInfo.keys()), _b = _a.next(); !_b.done; _b = _a.next()) {
                    key = _b.value;
                    tmp = this.zxyInfo.get(key);
                    attributes = {};
                    restApi_1.updateStates(key, {
                        entity_id: key,
                        state: state,
                        attributes: {
                            restored: false,
                            supported_features: 4,
                            friendly_name: tmp.name,
                            state: state,
                        },
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return [2 /*return*/];
        });
    });
};
exports.default = CloudRFBridgeController;
