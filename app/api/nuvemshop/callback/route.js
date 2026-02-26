export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response("Faltou ?code=", { status: 400 });
  }

  const client_id = process.env.NUVEMSHOP_CLIENT_ID;
  const client_secret = process.env.NUVEMSHOP_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    return new Response("ENV não configurada (client_id/client_secret).", { status: 500 });
  }

  const resp = await fetch("https://www.nuvemshop.com/apps/authorize/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id,
      client_secret,
      grant_type: "authorization_code", // <-- ESSENCIAL
      code,
    }),
  });

  const data = await resp.json();

  return new Response(JSON.stringify(data, null, 2), {
    status: resp.status,
    headers: { "Content-Type": "application/json" },
  });
}
