"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var movies_1 = require("../handlers/movies");
var router = (0, express_1.Router)();
router.get('/', movies_1.getAllMovies);
router.get('/:id', movies_1.getMovieById);
router.put('/:id', movies_1.updateMovie);
router.delete('/:id', movies_1.deleteMovie);
exports.default = router;
//# sourceMappingURL=movieRouter.js.map