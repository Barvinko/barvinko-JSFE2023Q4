export async function getData<T>(url: string): Promise<{ data: T; status: number }> {
  const response: Response = await fetch(url, { method: 'GET' });
  // if (!response) {
  //   throw new Error(`Error occurred!`);
  // }
  // if (!response.ok) {
  //   throw new Error('Network response was not ok');
  // }
  const data: T = await response.json();
  return { data, status: response.status };
}
