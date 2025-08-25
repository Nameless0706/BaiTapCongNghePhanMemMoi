import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";

import viewEngine from "./config/viewEngine.js";
import initWebRoutes from './route/web.js';
import connectDB from './config/configdb.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
viewEngine(app);
initWebRoutes(app);
connectDB();

const port: number = Number(process.env.PORT) || 6969;

app.listen(port, () => {
    console.log("Server running at port : " + port);
})