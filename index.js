import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import credentials from './credentials.json' assert { type: 'json' };
import clientesRouter from './routes/clientes.routes.js';

const SERVER_PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use (clientesRouter)


const auth = new google.auth.GoogleAuth({
    keyFile: './credentials.json',
    scopes: ['https://www.googleapis.com/auth/calendar'],
});

export const calendar = google.calendar({ version: 'v3', auth });


app.listen(SERVER_PORT, () => console.log("Servidor inicializado en el puerto " + SERVER_PORT));