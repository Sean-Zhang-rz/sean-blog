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
