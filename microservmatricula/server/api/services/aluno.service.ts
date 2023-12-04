import { Container, SqlQuerySpec } from '@azure/cosmos';
import cosmosDb from '../../common/cosmosdb';
import { Aluno } from '../entites/aluno';

class AlunoService {
  private container: Container = cosmosDb.container('aluno');

  async updateEvent(aluno:Aluno): Promise<Aluno>{
    await this.container.items.upsert(aluno);
    return Promise.resolve(aluno);
  }
}

export default new AlunoService();
