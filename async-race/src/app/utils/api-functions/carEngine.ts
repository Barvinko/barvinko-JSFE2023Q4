import { RequestMethods, ApiUrls, EngineStatus } from '@type/enums';
import { EngineData, EngineAnswer } from '@type/type';

export async function carEngine(id: number, status: EngineStatus): Promise<EngineAnswer> {
  const url = `${ApiUrls.ENGINE}?id=${id}&status=${status}`;
  const response: Response = await fetch(url, {
    method: RequestMethods.PATCH,
  });

  if (!response.ok && response.status !== 500) {
    if (response.status === 400) {
      throw new Error(
        'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"',
      );
    } else if (response.status === 404) {
      throw new Error('Car with such id was not found in the garage.');
    } else {
      throw new Error(`Failed to control engine. Status: ${response.status}`);
    }
  }

  let data: EngineData | string;

  if (response.status === 200) {
    data = await response.json();
  } else {
    data = await response.text();
  }
  return { data, status: response.status };
}
