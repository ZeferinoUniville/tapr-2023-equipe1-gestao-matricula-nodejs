import { Container, SqlQuerySpec } from '@azure/cosmos';
import cosmosDb from '../../common/cosmosdb';
import { Aluno } from '../entites/aluno';
import { DaprClient } from "@dapr/dapr";
import daprClient from "../../common/daprclient";

class AlunoService {
  private container: Container = cosmosDb.container('aluno');

  async publishEvent(aluno:Aluno): Promise<Aluno>{
    daprClient.pubsub.publish(process.env.APPCOMPONENTSERVICE as string,
                              process.env.APPCOMPONENTTOPICMATRICULA as string,
                              aluno);
    return Promise.resolve(aluno);
  }

  async all(): Promise<Aluno[]> {
    const { resources: listaCarros } = await this.container.items
      .readAll<Aluno>()
      .fetchAll();

    return Promise.resolve(listaCarros);
  }

  async consultarAluno(id:string): Promise<Aluno>{
    const querySpec: SqlQuerySpec = {
        query: "SELECT * FROM Aluno aluno WHERE aluno.id = @id",
        parameters: [
            {name: "@id", value: id}
        ]
        };
    const {resources: listaAlunos}
        = await this.container.items.query(querySpec).fetchAll();
    
    return Promise.resolve(listaAlunos[0]);
  }

  async registrarAluno(aluno: Aluno): Promise<Aluno> {
    aluno.id = '';
    await this.container.items.create(aluno);
    await this.publishEvent(aluno);
    return Promise.resolve(aluno);
  }

  async atualizarAluno(id:string, aluno:Aluno): Promise<Aluno>{
    const querySpec: SqlQuerySpec = {
        query: "SELECT * FROM Aluno aluno WHERE aluno.id = @id",
        parameters: [
            {name: "@id", value: id}
        ]
        };
    const {resources: listaAlunos}
        = await this.container.items.query(querySpec).fetchAll();
    const AlunoAntigo = listaAlunos[0];
    //Atualizar os campos
    AlunoAntigo.Matricula = aluno.Matricula;
    
    await this.container.items.upsert(AlunoAntigo)
    await this.publishEvent(AlunoAntigo);
    return Promise.resolve(AlunoAntigo);
  }
}

export default new AlunoService();
