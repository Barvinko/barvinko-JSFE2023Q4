import { RequestMethods } from '@type/enums';

export async function putData<T>(url: string, data: T): Promise<number> {
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
