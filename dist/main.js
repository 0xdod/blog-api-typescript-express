"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const app_1 = __importDefault(require("./app"));
const config = (0, config_1.default)();
app_1.default.listen(config.port, () => {
    console.log("Server is listening on port %s", config.port);
});
