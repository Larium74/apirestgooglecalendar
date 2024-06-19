import { calendar } from "../index.js";

export const listaEventos = async (req, res) => {
    try {
        console.log('Obteniendo eventos...');
        const now = new Date().toISOString();
        console.log('Fecha y hora actual:', now);

        const response = await calendar.events.list({
            calendarId: 'yerozm74@gmail.com',
            timeMin: now,
            maxResults: 5,
            singleEvents: true,
            orderBy: 'startTime',
        });

        const endTimes = response.data.items.map(event => event.end.dateTime);

        res.json(endTimes);

        console.log('Horas de finalización:', endTimes);
    } catch (error) {
        console.error('Error al obtener eventos:', error);
        res.status(500).send('Error al obtener eventos');
    }
}

export let crearEvento = async (req, res) => {
    try {
        const { summary, location, description, start, end } = req.body;

        const event = {
            summary,
            location,
            description,
            start: {
                dateTime: start,
                timeZone: 'America/Bogota',
            },
            end: {
                dateTime: end,
                timeZone: 'America/Bogota',
            },
        };

        const response = await calendar.events.insert({
            calendarId: 'yerozm74@gmail.com',
            resource: event,
        });

        res.status(201).json(response.data);
        console.log('Evento creado:', response.data);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send('Error al crear el evento');
    }
}