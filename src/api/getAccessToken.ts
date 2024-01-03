"use server";
export async function getAccessToken() {
  console.log("start accessToken server ===>");
  const accessToken = await getAccessToken();
  console.log("end accessToken server ===>", accessToken);
  return accessToken;
}
