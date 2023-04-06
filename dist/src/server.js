"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var movieRouter_1 = __importDefault(require("./routers/movieRouter"));
var actorRouter_1 = __importDefault(require("./routers/actorRouter"));
var PORT = process.env.PORT || 3001;
var app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1/movies/', movieRouter_1.default);
app.use('/api/v1/actors/', actorRouter_1.default);
app.get('/', function (req, res) {
    res.json({ msg: 'API Home' });
});
app.listen(PORT, function () {
    console.log("App listening on port ".concat(PORT));
});
//# sourceMappingURL=server.js.map