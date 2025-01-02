import { ApiService } from '@/services/api.service'
import type { Dashboard } from '@/types/service.type'

export class TransactionService extends ApiService {
  constructor() {
    super('tx')
  }

  async getDashboard(): Promise<Dashboard> {
    const res = await this.auth().client.get('dashboard')
    return this.unpackRes(res) as Dashboard
  }
}
