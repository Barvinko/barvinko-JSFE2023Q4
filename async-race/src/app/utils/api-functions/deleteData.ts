import { RequestMethods } from '@type/enums';

export async function deleteData(url: string): Promise<number> {
  const response: Response = await fetch(url, {
    method: RequestMethods.DELETE,
  });

  // if (response.status !== 200 && response.status !== 404) {
  //   throw new Error('Failed to create data');
  // }
  return response.status;
}
