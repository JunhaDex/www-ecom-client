import { ApiService } from '@/services/api.service'
import type { PaginatedResponse } from '@/types/ui.type'
import type { Product } from '@/types/service.type'

export class ProductService extends ApiService {
  constructor() {
    super('product')
  }

  async listProduct(): Promise<PaginatedResponse<Product>> {
    const res = await this.auth().client.get('list')
    return this.unpackRes(res) as PaginatedResponse<Product>
  }
}
