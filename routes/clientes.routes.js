import {Router} from "express"
import { crearEvento, listaEventos } from "../controllers/clientes.controllers.js";

let clientesRouter = Router ()

clientesRouter.get ("/eventos", listaEventos)
clientesRouter.post ("/crearEvento", crearEvento)

export default clientesRouter;