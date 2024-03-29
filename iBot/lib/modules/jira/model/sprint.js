"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../support/utils");
var url_1 = require("../support/url");
var issue_1 = require("./issue");
var Sprint = (function () {
    function Sprint(sprint) {
        Object.assign(this, sprint);
    }
    Sprint.prototype.getIssuesAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issues;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.jiraGetJsonAsync(url_1.JiraUrl.sprint + "/" + this.id + "/issue/?fields=" + issue_1.Issue.interestedFields.join(','))];
                    case 1:
                        issues = _a.sent();
                        return [2 /*return*/, issues.issues];
                }
            });
        });
    };
    Sprint.prototype.getBurnDownRateAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var issues, totalEstimateTime, doneEstimate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getIssuesAsync()];
                    case 1:
                        issues = _a.sent();
                        totalEstimateTime = issue_1.Issue.calculateSumOfEstimate(issues);
                        doneEstimate = issue_1.Issue.calculateSumOfEstimate(issues.filter(function (i) { return i.fields.status.name == 'Done'; }));
                        if (totalEstimateTime == 0) {
                            return [2 /*return*/, NaN];
                        }
                        else {
                            return [2 /*return*/, (doneEstimate / totalEstimateTime) * 100];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Sprint;
}());
exports.Sprint = Sprint;
