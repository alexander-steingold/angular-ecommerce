import dotenv from 'dotenv';

dotenv.config();

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
    origin: ["http://localhost:4200"]
})); // accept request from specified server

app.use("/api/items", itemRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use(express.static('public'));
const port = process.env.PORT || 5000; // default port

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}) // start server