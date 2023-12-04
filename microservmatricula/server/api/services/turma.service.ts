import { Container, SqlQuerySpec } from '@azure/cosmos';
import cosmosDb from '../../common/cosmosdb';
import { Turma } from '../entites/turma';

class TurmaService {
  private container: Container = cosmosDb.container('turma');

  async updateEvent(turma:Turma): Promise<Turma>{
    await this.container.items.upsert(turma);
    return Promise.resolve(turma);
  }
}

export default new TurmaService();