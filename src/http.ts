import express from "express";
import http from "http";
import { join } from "path";
import * as dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(express.static(join(__dirname, "..", "public")));
app.use(express.json());

const serverHttp = http.createServer(app);

export { serverHttp };
