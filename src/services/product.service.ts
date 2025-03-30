import { ApiService } from '@/services/api.service'
import type { PaginatedResponse } from '@/types/ui.type'
import type { CartInput, CartItem, Product } from '@/types/service.type'

export class ProductService extends ApiService {
  constructor() {
    super('product')
  }

  async listProduct(): Promise<PaginatedResponse<Product>> {
    const res = await this.auth().client.get('list')
    return this.unpackRes(res) as PaginatedResponse<Product>
  }

  async getProduct(id: number): Promise<Product> {
    const res = await this.auth().client.get(`${id}`)
    return this.unpackRes(res) as Product
  }

  async listCartItem(): Promise<PaginatedResponse<CartItem>> {
    const res = await this.auth().client.get('cart')
    return this.unpackRes(res) as PaginatedResponse<CartItem>
  }

  async listCheckoutProduct(ids: number[]): Promise<Product[]> {
    const res = await this.auth().client.get('many', {
      params: { ids },
    })
    return this.unpackRes(res) as Product[]
  }

  async getCartItem(productId: number): Promise<CartItem> {
    const res = await this.auth().client.get(`cart/${productId}`)
    return this.unpackRes(res) as CartItem
  }

  async changeCartItem(cartItem: CartInput): Promise<void> {
    await this.auth().client.put('cart', cartItem)
  }

  async removeFromCart(productIds: number[]): Promise<void> {
    await this.auth().client.post('cart/clear', { productIds })
  }
}
