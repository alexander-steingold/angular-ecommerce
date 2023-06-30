import dotenv from 'dotenv';

dotenv.config();
import path from 'path';
import express, {request} from "express";
import cors from "cors";
import itemRouter from "./routers/item.router";
import userRouter from "./routers/user.router";
import orderRouter from "./routers/order.router";
import {dbConnect} from "./configs/database.config";

dbConnect();
const app = express();
app.use(express.json()); // for parsing JSON POST data
app.use(cors({
    credentials: true,
    //origin: ["http://localhost:4200"]
    origin: "*"
})); // accept request from specified server

app.use("/api/items", itemRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use(express.static('public'));

app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html')) // take care of all frontend routes
    }
);
const port = process.env.PORT || 5000; // default port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}) // start server