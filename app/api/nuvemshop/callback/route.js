export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response("Faltou ?code= na URL", { status: 400 });
  }

  const client_id = process.env.NUVEMSHOP_CLIENT_ID;       // seu app_id
  const client_secret = process.env.NUVEMSHOP_CLIENT_SECRET;

  // troca code -> access_token
  const body = new URLSearchParams({
    client_id,
    client_secret,
    code,
  });

  const resp = await fetch("https://www.tiendanube.com/apps/authorize/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await resp.json();

  // ATENÇÃO: isso aqui devolve o token na tela (ok pra teste).
  // Em produção, o ideal é salvar em banco e mostrar só "OK".
  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}