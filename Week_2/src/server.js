import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from './config/configdb';

require('dotenv').config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.port || 6969

app.listen(port, () => {
    console.log("Server running at port : " + port);
})