export async function getData<T>(url: string): Promise<{ data: T; totalNumOfCars: string }> {
  const response: Response | Error = await fetch(url, { method: 'GET' });
  if (!response) {
    throw new Error(`Error occurred!`);
  }
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: T = await response.json();
  const totalNumOfCars: string = response.headers.get('X-Total-Count') || '';
  return { data, totalNumOfCars };
}
