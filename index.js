"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'https://3205front-z59a.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
}));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const usersFilePath = path_1.default.join(__dirname, 'index.json');
const usersJson = fs_1.default.readFileSync(usersFilePath, 'utf-8');
const usersObj = JSON.parse(usersJson);
app.post('/', (req, res) => {
    const { email, number } = req.body;
    const users = usersObj.filter((item) => {
        if (number) {
            return item.email === email && item.number === number;
        }
        else {
            return item.email === email;
        }
    });
    setTimeout(() => {
        users && res.json(users);
        console.log(users);
    }, 5000);
});
const PORT = process.env.PORT || 3040;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
