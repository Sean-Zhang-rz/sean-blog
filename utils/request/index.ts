import axios from 'axios';

export interface Res<Data> {
  code: number;
  data: Data;
  msg?: string;
}

interface Body {
  action?: string;
  [key: string]: unknown;
}

type Method = 'post' | 'get';

type ApiConfig = {
  showToast?: boolean;
  retry?: 0 | 1 | 2 | 3;
  loginRetry?: number;
  needLogin?: boolean;
  header?: Record<string, string>;
};

export const api = '/api/v1';

class Request {
  private async base<Response>(
    method: Method,
    apiAddress: string,
    data: undefined | Body,
    apiConfig?: ApiConfig
  ): Promise<Res<Response>> {
    let retry = apiConfig?.retry ?? 0;
    let loginRetry = apiConfig?.loginRetry ?? 2;
    const showToast = apiConfig?.showToast ?? true;
    const needLogin = true;

    const opt = {
      url: `${api}${data?.action ? `/${data?.action}` : ''}`,
      method,
      data: {
        ...data,
        // todo
        // token: needLogin ? await authLogin.getToken() : undefined,
        // systemCode: systemInfo.systemCode,
      },
    };
    const request = axios[method];
    const req: Promise<Res<Response>> = request(opt.url, data).then((res) => res.data);

    let res: Res<Response>;

    try {
      res = await req;
    } catch (error) {
      if (retry > 0) {
        retry = (retry - 1) as 0;
        return this.base(method, apiAddress, data, {
          ...apiConfig,
          retry,
        });
      }
      if (showToast) console.log(error);
      throw new Error('网络错误');
    }

    switch (res.code) {
      case 0:
        return res;
      case 401:
        // todo
        // authLogin.logout();
        if (loginRetry > 0) {
          loginRetry = (loginRetry - 1) as 0;
          return this.base(method, apiAddress, data, {
            ...apiConfig,
            retry,
          });
        }
        break;
      default:
    }
    if (showToast) console.log('业务异常');
    throw new Error('业务异常');
  }

  post<Response>(
    apiAddress: string,
    data: undefined | Body,
    apiConfig?: ApiConfig
  ): Promise<Res<Response>> {
    return this.base('post', apiAddress, data, apiConfig);
  }

  get<Response>(
    apiAddress: string,
    data: undefined | Body,
    apiConfig?: ApiConfig
  ): Promise<Res<Response>> {
    return this.base('get', apiAddress, data, apiConfig);
  }
}

export default Request;
