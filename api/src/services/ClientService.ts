import { AppDataSource } from "../data-source";
import { client } from "../entities/Client";

export const ClientRepository = AppDataSource.getRepository(client)

