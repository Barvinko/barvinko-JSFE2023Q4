import { RequestMethods } from '@type/enums';

export async function createData<T>(url: string, sendData: T): Promise<number> {
  const response: Response = await fetch(url, {
    method: RequestMethods.POST,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendData),
  });

  if (response.status === 201) {
    return response.status;
  }

  throw new Error('Failed to create data');
}
