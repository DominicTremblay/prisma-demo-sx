"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var actors_1 = require("../handlers/actors");
var router = (0, express_1.Router)();
router.get('/', actors_1.getAllActors);
router.get('/:id', actors_1.getActorById);
router.put('/:id', actors_1.getActorById);
router.delete('/:id', actors_1.deleteActor);
exports.default = router;
//# sourceMappingURL=actorRouter.js.map