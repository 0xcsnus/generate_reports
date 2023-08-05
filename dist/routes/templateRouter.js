"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const templateController_1 = require("../controllers/templateController");
const router = express_1.default.Router();
router.route('/generate')
    .get((req, res) => {
    res.send({ Message: "Generate get here" });
})
    .post(templateController_1.generateDocx);
router.route('/view/:id?')
    .get((req, res) => {
    res.send({ Message: "Viewer here" });
});
exports.default = router;
