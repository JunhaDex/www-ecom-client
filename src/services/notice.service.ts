import { ApiService } from '@/services/api.service'
import type { PageRequest, PaginatedResponse } from '@/types/ui.type'
import type { Notice } from '@/types/service.type'

export class NoticeService extends ApiService {
  constructor() {
    super('notice')
  }

  async listNotice(options?: PageRequest): Promise<PaginatedResponse<Notice>> {
    const res = await this.client.get('list', {
      params: {
        ...options,
      },
    })
    return this.unpackRes(res) as PaginatedResponse<Notice>
  }

  async getNotice(id: number): Promise<Notice> {
    const res = await this.client.get(`${id}`)
    return this.unpackRes(res) as Notice
  }
}
