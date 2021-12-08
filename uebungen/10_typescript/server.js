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
var e_1, _a;
// Start listening on port 8080 of localhost.
var server = Deno.listen({ port: 8080 });
console.log("HTTP webserver running.  Access it at:  http://localhost:8080/");
try {
    // Connections to the server will be yielded up as an async iterable.
    for (var server_1 = __asyncValues(server), server_1_1; server_1_1 = await server_1.next(), !server_1_1.done;) {
        var conn = server_1_1.value;
        // In order to not be blocking, we need to handle each connection individually
        // without awaiting the function
        serveHttp(conn);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (server_1_1 && !server_1_1.done && (_a = server_1.return)) await _a.call(server_1);
    }
    finally { if (e_1) throw e_1.error; }
}
function serveHttp(conn) {
    var e_2, _a;
    var _b;
    return __awaiter(this, void 0, void 0, function () {
        var httpConn, httpConn_1, httpConn_1_1, requestEvent, body_1, e_2_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    httpConn = Deno.serveHttp(conn);
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 6, 7, 12]);
                    httpConn_1 = __asyncValues(httpConn);
                    _c.label = 2;
                case 2: return [4 /*yield*/, httpConn_1.next()];
                case 3:
                    if (!(httpConn_1_1 = _c.sent(), !httpConn_1_1.done)) return [3 /*break*/, 5];
                    requestEvent = httpConn_1_1.value;
                    body_1 = "Your user-agent is:\n\n" + ((_b = requestEvent.request.headers.get("user-agent")) !== null && _b !== void 0 ? _b : "Unknown");
                    // The requestEvent's `.respondWith()` method is how we send the response
                    // back to the client.
                    requestEvent.respondWith(new Response(body_1, {
                        status: 200,
                    }));
                    _c.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_2_1 = _c.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _c.trys.push([7, , 10, 11]);
                    if (!(httpConn_1_1 && !httpConn_1_1.done && (_a = httpConn_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(httpConn_1)];
                case 8:
                    _c.sent();
                    _c.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    });
}
res = await fetch(url);
var body = new Uint8Array(await res.arrayBuffer());
await Deno.stdout.write(body);
//# sourceMappingURL=server.js.map