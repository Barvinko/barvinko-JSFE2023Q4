import { RequestMethods } from '@type/enums';
import { CarTypeApi } from '@type/type';

export async function putData(url: string, data: CarTypeApi): Promise<number> {
  const response: Response = await fetch(url, {
    method: RequestMethods.PUT,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (response.status !== 200) {
    throw new Error('Failed to update car attributes');
  }
  return response.status;
}
