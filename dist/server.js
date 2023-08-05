"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const templateRouter_1 = __importDefault(require("./routes/templateRouter"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./logger"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/logs', express_1.default.static('./logs'));
app.post('/api/restart', (req, res) => {
    // Perform any necessary cleanup or save data before restarting (optional)
    res.status(200).json({ message: 'Server is restarting...' });
    process.exit(0); // This will restart the server process
});
app.use('/api/template', templateRouter_1.default);
const start = async () => {
    try {
        app.listen(3005, () => logger_1.default.info("Server Running!"));
    }
    catch (e) {
        console.log(e);
        process.exit(0);
    }
};
exports.start = start;
