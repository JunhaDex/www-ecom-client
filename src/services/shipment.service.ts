import { ApiService } from '@/services/api.service'
import type { UserAddress } from '@/types/service.type'

export class ShipmentService extends ApiService {
  constructor() {
    super('shipment')
  }

  async registerShipment(addr: UserAddress): Promise<void> {
    await this.auth().client.post('new', addr)
  }
}
