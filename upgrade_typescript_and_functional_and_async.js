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
var LectureContentLoader = /** @class */ (function () {
    function LectureContentLoader(contentRootQuery, jsonFilePath) {
        var _this = this;
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = this;
                        return [4 /*yield*/, this._loadLectureContent(jsonFilePath)];
                    case 1:
                        _a._lectureContent = _b.sent();
                        this._renderLectureContent(contentRootQuery);
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
    LectureContentLoader.prototype._loadLectureContent = function (jsonFilePath) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(jsonFilePath)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    LectureContentLoader.prototype._renderLectureContent = function (contentRootQuery) {
        var content;
        var html = "";
        for (var _i = 0, _a = this._lectureContent; _i < _a.length; _i++) {
            content = _a[_i];
            html += this._htmlCode(content, this._templateCode, this._linkCode);
        }
        document.querySelector(contentRootQuery).innerHTML = html;
    };
    LectureContentLoader.prototype._htmlCode = function (content, templateFunction, linksFunction) {
        var htmlCode = "\n             <section>\n                <h3>" + content.lectureName + "</h3>\n                <h4>" + content.taskName + "</h4>\n        \n                <ul class=\"taskInfo\">\n                    <li>\n                        " + content.taskInfo + "\n                    </li>\n                </ul>\n        \n                <div class=\"taskDetails\">\n                    <div class=\"taskTemplate\">\n                        " + templateFunction.call(this, content) + "\n                    </div>\n        \n                    <div class=\"taskLinks\">\n                        " + linksFunction.call(this, content) + "\n                    </div>\n                </div>\n            </section>\n        ";
        return htmlCode;
    };
    LectureContentLoader.prototype._templateCode = function (content) {
        switch (this._templateType(content)) {
            case "iframe":
                return "<iframe loading=\"lazy\" \n                            src=\"" + content.taskLinks.template + "\"\n                            title=\"" + content.taskName + "\"\n                            ></iframe>";
            case "image":
                return "<img loading=\"lazy\" \n                            src=\"" + content.taskLinks.template + "\"\n                            alt=\"" + content.taskName + "\"\n                            title=\"" + content.taskName + "\"\n                            \">";
        }
    };
    LectureContentLoader.prototype._templateType = function (content) {
        var pictureRegex = /png|jpg|jpeg|gif$/;
        var iframeRegex = /youtube\.com|youtu\.be/;
        if ((content.taskLinks.template.match(pictureRegex)) !== null) {
            return "image";
        }
        else if (content.taskLinks.template.match(iframeRegex) !== null) {
            return "iframe";
        }
        throw "unknown template type";
    };
    LectureContentLoader.prototype._linkCode = function (content) {
        return "\n            <a href=\"" + content.taskLinks.template + "\">Vorlage</a>\n            <a href=\"" + content.taskLinks.result + "\">Ergebnis</a>\n            <a href=\"" + content.taskLinks.source + "\">Quelle</a>\n        ";
    };
    return LectureContentLoader;
}());
new LectureContentLoader("article", "./content.json");
//# sourceMappingURL=upgrade_typescript_and_functional_and_async.js.map