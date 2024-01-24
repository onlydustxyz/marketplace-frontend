const BASE_URL = process.env.VERIFF_BASE_URL ?? "";
const API_KEY = process.env.VERIFF_API_KEY ?? "";
export async function POST(request: Request) {
  const { vendorData } = await request.json();

  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-CLIENT": API_KEY,
    },
    body: JSON.stringify({ vendorData }),
  });

  if (!res.ok) {
    return new Response(res.body, { status: res.status });
  }

  const { verification } = await res.json();
  const { id, url, vendorData: verificationVendorData } = verification;

  return new Response(JSON.stringify({ id, url, vendorData: verificationVendorData }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
