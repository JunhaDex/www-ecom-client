import { ApiService } from '@/services/api.service'
import type { LoginInput, User } from '@/types/service.type'
import { useAuthStore } from '@/stores/auth.store'

export class UserService extends ApiService {
  constructor() {
    super('user')
  }

  async login(params: LoginInput): Promise<void> {
    const auth = useAuthStore()
    const res = await this.client.post('login', params)
    const cred = this.unpackRes(res) as { accessToken: string; user: User }
    auth.setCredential(cred.accessToken, cred.user)
    return
  }

  async updatePwd(params: { oldPwd: string; newPwd: string }): Promise<void> {
    await this.auth().client.post('profile/pwd', params)
  }
}
