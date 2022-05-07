import Request, { api } from 'utils/request';
import SignInProps, { SignUpProps } from '../../../api/types/init';

class InitApi extends Request {
  async signIn(data: SignInProps): Promise<{}> {
    return this.post<{}>(api, {
      action: 'sessions',
      ...data,
    }).then((r) => r.data);
  }

  async signUp(data: SignUpProps): Promise<{}> {
    return this.post<{}>(api, {
      action: 'users',
      ...data,
    }).then((r) => r.data);
  }
}

const initApi = new InitApi();
export default initApi;
