import { DataSource, Repository} from "typeorm";
import { ClientRepository } from "../../application/repository/client-repository";
import { Client } from "../../domain/entity/client";
import { ClientEntityOrm } from "../database/postgres/orm/entity/Client";

export class ClientRepositoryDatabase implements ClientRepository {
    private repository: Repository<ClientEntityOrm>

    constructor(appDataSource: DataSource) {
        this.repository = appDataSource.getRepository(ClientEntityOrm);
    }
    
    async findById(id: string): Promise<Client> {
        const clientData = await this.repository.findOne({ where: { id } }); 
        return new Client({
            id: clientData.id,
            name: clientData.name,
            email: clientData.email,
            createdAt: clientData.createdAt,
            updatedAt: clientData.updatedAt
        });
    }

    async save(client: Client): Promise<void> {
        await this.repository.save({
            id: client.id,
            name: client.name,
            email: client.email,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        });
    }
}