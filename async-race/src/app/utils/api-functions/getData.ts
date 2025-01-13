export async function getData<T>(url: string): Promise<{ data: T; status: number }> {
  const response: Response = await fetch(url, { method: 'GET' });
  const data: T = await response.json();
  return { data, status: response.status };
}
