import { ApiService } from '@/services/api.service'
import type { ConfirmTxInput, CreateTxInput, Dashboard } from '@/types/service.type'

export class TransactionService extends ApiService {
  constructor() {
    super('tx')
  }

  async getDashboard(): Promise<Dashboard> {
    const res = await this.auth().client.get('dashboard')
    return this.unpackRes(res) as Dashboard
  }

  async initPaymentTx(txInit: CreateTxInput): Promise<void> {
    await this.auth().client.post('init', txInit)
  }

  async confirmPaymentTx(txConfirm: ConfirmTxInput): Promise<void> {
    await this.auth().client.post('confirm', txConfirm)
  }
}
