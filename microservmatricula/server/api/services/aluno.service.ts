import { Container } from "@azure/cosmos";
import cosmosDb from "../../common/cosmosdb";
import { Aluno } from "../entites/aluno";

class AlunoService{
    private container:Container =
        cosmosDb.container("carro");

    async all(): Promise<Aluno[]>{
        const {resources: listaCarros}
            = await this.container.items.readAll<Aluno>().fetchAll();

        return Promise.resolve(listaCarros);
    }
}

export default new AlunoService();