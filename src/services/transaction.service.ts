import { ApiService } from '@/services/api.service'
import type {
  CartItem,
  ConfirmTxInput,
  CreateTxInput,
  Dashboard,
  TxListItem,
} from '@/types/service.type'
import type { PaginatedResponse } from '@/types/ui.type'
import dayjs from 'dayjs'

export class TransactionService extends ApiService {
  constructor() {
    super('tx')
  }

  async getDashboard(): Promise<Dashboard> {
    const res = await this.auth().client.get('dashboard')
    return this.unpackRes(res) as Dashboard
  }

  async listTx(): Promise<PaginatedResponse<TxListItem>> {
    const res = await this.auth().client.get('list')
    const raw = (this.unpackRes(res) as PaginatedResponse<any>).list
    const txList = raw.map(
      (tx: any) =>
        ({
          id: tx.id,
          txName: tx.txName,
          txNote: tx.txNote,
          status: tx.status,
          createdAt: dayjs(tx.createdAt).format('YYYY-MM-DD'),
          products: tx.products.map(
            (pd: any) =>
              ({
                id: pd.id,
                count: pd.count,
                price: pd.price,
                product: pd.product,
              }) as CartItem,
          ),
          shipment: tx.shipment,
          payment: tx.payment,
        }) as TxListItem,
    )
    return {
      list: txList,
      meta: res.data.meta,
    }
  }

  async initPaymentTx(txInit: CreateTxInput): Promise<void> {
    await this.auth().client.post('init', txInit)
  }

  async confirmPaymentTx(txConfirm: ConfirmTxInput): Promise<void> {
    await this.auth().client.post('confirm', txConfirm)
  }

  async invalidateTx(orderId: string): Promise<void> {
    await this.auth().client.put(`cancel/${orderId}`, {})
  }
}
