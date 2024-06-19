import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';
import clientesRouter from './routes/clientes.routes.js';
import { config } from 'dotenv';

config();

const SERVER_PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(clientesRouter);

const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

const auth = new google.auth.GoogleAuth({
    credentials: {
        type: process.env.GOOGLE_TYPE,
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: privateKey,
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: process.env.GOOGLE_AUTH_URI,
        token_uri: process.env.GOOGLE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
        universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
});

export const calendar = google.calendar({ version: 'v3', auth });

app.listen(SERVER_PORT, () => console.log("Servidor inicializado en el puerto " + SERVER_PORT));