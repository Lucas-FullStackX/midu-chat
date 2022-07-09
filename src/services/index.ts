export const getAccessToken = async ({
  token
}: {
  token: string;
}): Promise<string> => {
  const res = await fetch('/api/get-access-token', {
    headers: {
      jwt: token
    }
  });
  console.log(res);
  if (!res.ok) throw new Error('Error getting access token');

  const { accessToken } = await res.json();
  return accessToken;
};
