import express, {request} from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {sample_foods, sample_tags, sample_users} from "./data";

const app = express();
app.use(express.json()); // for parsing JSON POST data
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
})); // for parsing HTTP Cookies

app.get("/api/items", (req, res) => {
    res.send(sample_foods);
}) // for getting all items

app.get("/api/items/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const items = sample_foods.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(items);
}) // for getting items by search term

app.get("/api/items/tags", (req, res) => {
    res.send(sample_tags);
}) // for getting items tags

app.get("/api/items/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const items = sample_foods.filter(item => item.tags?.includes(tagName));
    res.send(items);
}) // for getting items by tag

app.get("/api/items/:itemId", (req, res) => {
    const itemId = req.params.itemId;
    const item = sample_foods.find(item => item.id == itemId)
    res.send(item);
}) // for getting item by id

app.post("/api/user/login", (req, res) => {
    const {email, password} = req.body;
    const user = sample_users.find(user => user.email === email && user.password === password);
    if (user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send("Invalid credentials!");
    }
}) // for logging in user

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({email: user.email, isAdmin: user.isAdmin},
        "secret",
        {expiresIn: "30d"});
    user.token = token;
    return user;
}


const port = process.env.PORT || 5000; // default port

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}) // start server