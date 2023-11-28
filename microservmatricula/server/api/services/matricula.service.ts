import { Container, SqlQuerySpec } from '@azure/cosmos';
import cosmosDb from '../../common/cosmosdb';
import { Matricula } from '../entites/matricula';
import { DaprClient } from "@dapr/dapr";
import daprClient from "../../common/daprclient";

class MatriculaService {
  private container: Container = cosmosDb.container('matricula');

  async registrarMatricula(matricula:Matricula): Promise<Matricula> {
    matricula.id = '';
    await this.container.items.create(matricula);
    await this.publishEvent(matricula);
    return Promise.resolve(matricula);
  }

  async atualizarMatricula(id:string, matricula:Matricula): Promise<Matricula>{
    const querySpec: SqlQuerySpec = {
        query: "SELECT * FROM Matricula matricula WHERE matricula.id = @id",
        parameters: [
            {name: "@id", value: id}
        ]
        };
    const {resources: listaMatricula}
        = await this.container.items.query(querySpec).fetchAll();
    const MatriculaAntiga = listaMatricula[0];
    //Atualizar os campos
    MatriculaAntiga.aluno = matricula.aluno;
    MatriculaAntiga.turma = matricula.turma;
    MatriculaAntiga.semestre = matricula.semestre;
    
    await this.container.items.upsert(MatriculaAntiga)
    await this.publishEvent(MatriculaAntiga);
    return Promise.resolve(MatriculaAntiga);
  }

  async consultarMatriculas(): Promise<Matricula[]> {
    const { resources: listaMatriculas } = await this.container.items
      .readAll<Matricula>()
      .fetchAll();

    return Promise.resolve(listaMatriculas);
  }

  async consultarMatricula(id:string): Promise<Matricula>{
    const querySpec: SqlQuerySpec = {
        query: "SELECT * FROM Matricula matricula WHERE matricula.id = @id",
        parameters: [
            {name: "@id", value: id}
        ]
        };
    const {resources: listaMatriculas}
        = await this.container.items.query(querySpec).fetchAll();
    
    return Promise.resolve(listaMatriculas[0]);
  }

  async publishEvent(matricula:Matricula): Promise<Matricula>{
    daprClient.pubsub.publish(process.env.APPCOMPONENTSERVICE as string,
                              process.env.APPCOMPONENTTOPICMATRICULA as string,
                              matricula);
    return Promise.resolve(matricula);
  }
}

export default new MatriculaService();
