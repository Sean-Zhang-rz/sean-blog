interface ResProps<Data> {
  code?: number;
  data: Data;
  msg?: string;
}
export function successResponse<Data>(options?: ResProps<Data>) {
  return {
    code: options?.code || 0,
    msg: options?.msg || 'ok',
    data: options?.data,
  };
}
export function errorResponse<Data>(options?: ResProps<Data>) {
  return {
    code: options?.code || 400,
    msg: options?.msg || 'error',
  };
}
export function unauthorisedResponse<Data>(options?: ResProps<Data>) {
  return {
    code: options?.code || 103,
    msg: options?.msg || '请先登录',
  };
}
