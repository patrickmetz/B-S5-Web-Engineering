// start via "deno run --allow-net --allow-read"
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var Covid19StatisticsServer = /** @class */ (function () {
    function Covid19StatisticsServer(serverPort, textFilePath) {
        var _this = this;
        // null type stops deno from complaining about fields initialized in IIFE
        this._covidData = null;
        this._httpServer = null;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, this._readTextFileAsCovidData(textFilePath)];
                    case 1:
                        _a._covidData = _b.sent();
                        this._httpServer = this._createServer(serverPort);
                        this._serveAllHttpConnections();
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    }
    Covid19StatisticsServer.prototype._readTextFileAsCovidData = function (jsonFilePath) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, Deno.readTextFile(jsonFilePath)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    Covid19StatisticsServer.prototype._createServer = function (port) {
        console.log("Covid 19 statistics server is listening at: http://localhost:" + port + "/");
        return Deno.listen({ port: port });
    };
    Covid19StatisticsServer.prototype._serveAllHttpConnections = function () {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function () {
            var connection, _b, _c, e_2_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!(this._httpServer !== null)) return [3 /*break*/, 12];
                        connection = void 0;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 12]);
                        _b = __asyncValues(this._httpServer);
                        _d.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 5];
                        connection = _c.value;
                        this._serveOneHttpConnection(connection); // not using await => non blocking
                        _d.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _d.trys.push([7, , 10, 11]);
                        if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(_b)];
                    case 8:
                        _d.sent();
                        _d.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Covid19StatisticsServer.prototype._serveOneHttpConnection = function (connection) {
        var e_3, _a;
        return __awaiter(this, void 0, void 0, function () {
            var httpConnection, httpConnection_1, httpConnection_1_1, requestEvent, e_3_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        httpConnection = Deno.serveHttp(connection);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 12]);
                        httpConnection_1 = __asyncValues(httpConnection);
                        _b.label = 2;
                    case 2: return [4 /*yield*/, httpConnection_1.next()];
                    case 3:
                        if (!(httpConnection_1_1 = _b.sent(), !httpConnection_1_1.done)) return [3 /*break*/, 5];
                        requestEvent = httpConnection_1_1.value;
                        requestEvent.respondWith(new Response(this._htmlCode(), {
                            status: 200,
                            headers: {
                                'content-type': 'text/html; charset=UTF-8'
                            }
                        }));
                        _b.label = 4;
                    case 4: return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 12];
                    case 6:
                        e_3_1 = _b.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 12];
                    case 7:
                        _b.trys.push([7, , 10, 11]);
                        if (!(httpConnection_1_1 && !httpConnection_1_1.done && (_a = httpConnection_1.return))) return [3 /*break*/, 9];
                        return [4 /*yield*/, _a.call(httpConnection_1)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        if (e_3) throw e_3.error;
                        return [7 /*endfinally*/];
                    case 11: return [7 /*endfinally*/];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Covid19StatisticsServer.prototype._htmlCode = function () {
        if (this._covidData !== null) {
            var statistics = this._numbersToSimpleStatistics(this._covidData.map(function (x) { return x.Anzahl; }));
            return "<!DOCTYPE html>\n                <html lang=\"en\">\n                <head>\n                    <meta charset=\"UTF-8\">\n                    <title>Covid19-Statistik</title>\n                    \n                    <style>\n                        td:first-child{font-weight: bold};\n                    </style>\n                </head>\n                <body>\n                \n                <h1>Covid19-F\u00E4lle in deutschen Bundesl\u00E4ndern</h1>\n                <table>\n                    <tr><td>Minimale Anzahl</td><td>" + statistics.min + "</td></tr>\n                    <tr><td>Maximale Anzahl</td><td>" + statistics.max + "</td></tr>\n                    <tr><td>Durchschnitt</td><td>" + statistics.mean + "</td></tr>\n                    <tr><td>Summe</td><td>" + statistics.sum + "</td></tr>\n                </table>\n                \n                </body>\n                </html>";
        }
        return "";
    };
    Covid19StatisticsServer.prototype._numbersToSimpleStatistics = function (numbers) {
        // source: https://stackoverflow.com/a/1669222
        var min = Math.min.apply(Math, numbers);
        var max = Math.max.apply(Math, numbers);
        // source: https://stackoverflow.com/a/10624256
        var sum = numbers.reduce(function (a, b) { return a + b; }, 0);
        var mean = Math.round(sum / numbers.length);
        return { min: min, max: max, mean: mean, sum: sum };
    };
    return Covid19StatisticsServer;
}());
new Covid19StatisticsServer(8080, './covid_19_fallzahlen_in_deutschland.json');
//# sourceMappingURL=server.js.map