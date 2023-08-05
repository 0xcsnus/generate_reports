"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDocx = void 0;
const carbone_1 = __importDefault(require("carbone"));
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("../logger"));
const generateDocx = async (req, res) => {
    const data = req.body;
    try {
        carbone_1.default.render('./templates/template.docx', data, function (err, result) {
            if (err) {
                logger_1.default.error(err);
                return res.status(500).json({ message: 'Error generating .docx file' });
            }
            const timestamp = new Date().toISOString().replace(/:/g, '-');
            const outputFilePath = `output/agreement${timestamp}.docx`;
            try {
                fs_1.default.writeFileSync(outputFilePath, result);
                res.status(200).json({ message: `File generated at ${outputFilePath}` });
                logger_1.default.info(data.id);
            }
            catch (writeErr) {
                logger_1.default.error(writeErr);
                return res.status(500).json({ message: 'Error writing .docx file' });
            }
        });
    }
    catch (e) {
        logger_1.default.error(e);
        res.status(500).end();
    }
};
exports.generateDocx = generateDocx;
