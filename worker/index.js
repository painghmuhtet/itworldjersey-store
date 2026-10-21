/**
 * IT WORLD JERSEY — ChitOo.Ai chat API + private custom-design upload API.
 * Uses Cloudflare Workers AI. Custom-design files stay in a private R2 bucket.
 */
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ALLOWED_ORIGINS = new Set([
  "https://itworldjersey.store",
  "https://www.itworldjersey.store",
  "https://ai.itworldjersey.store"
]);
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "application/pdf"]);
const SYSTEM_PROMPT = `You are ChitOo.Ai မေးရန်, the friendly shopping assistant for IT WORLD JERSEY, a football-jersey shop. IMPORTANT LANGUAGE RULE: If the user writes in Burmese/Myanmar, reply naturally in Burmese Unicode script. If they write in English, reply in English. If they mix languages, mirror their mix. Be helpful, concise, warm, and occasionally funny. Help customers search design numbers and prepare WhatsApp enquiries. Never invent prices, sizes, stock, delivery details, team names, colors, or product attributes. The catalogue currently contains design numbers but no verified live inventory or detailed team/color metadata. If asked about price, availability, sizes, delivery, or order status, say the shop must confirm it on WhatsApp. Do not ask for passwords, payment card details, or sensitive information. Shop WhatsApp: +60 11-2623 8907. Shop URL: https://itworldjersey.store/ . Use readable Unicode Burmese, not romanized Burmese, whenever replying in Burmese.`;

function response(data, status = 200, origin = "") {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Vary": "Origin"
  };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers["Access-Control-Allow-Methods"] = "POST, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type";
  }
  return new Response(JSON.stringify(data), { status, headers });
}
function safeText(value, max) {
  return String(value || "").replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
}
function corsPreflight(origin, methods = "POST, OPTIONS, GET") {
  if (!ALLOWED_ORIGINS.has(origin)) return response({ error: "Origin not allowed" }, 403);
  return new Response(null, { status: 204, headers: {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": methods,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  }});
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return corsPreflight(origin);

    if (url.pathname === "/api/health") {
      return response({ ok: true, service: "ChitOo.Ai မေးရန်", model: "Cloudflare Workers AI" }, 200, origin);
    }

    if (url.pathname === "/api/chat") {
      if (request.method !== "POST") return response({ error: "Method not allowed" }, 405, origin);
      if (origin && !ALLOWED_ORIGINS.has(origin)) return response({ error: "Origin not allowed" }, 403);
      if (!env.AI) return response({ error: "AI service is not configured yet." }, 503, origin);
      let body;
      try { body = await request.json(); } catch { return response({ error: "Please send valid JSON." }, 400, origin); }
      const messages = Array.isArray(body.messages) ? body.messages : [];
      const safeMessages = messages.filter(m => m && ["user", "assistant"].includes(m.role) && typeof m.content === "string")
        .slice(-12).map(m => ({ role: m.role, content: m.content.slice(0, 1500) }));
      if (!safeMessages.length || !safeMessages.some(m => m.role === "user")) return response({ error: "Please enter a message first." }, 400, origin);
      try {
        const result = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...safeMessages],
          max_tokens: 450,
          temperature: 0.55
        });
        const reply = result?.response || result?.choices?.[0]?.message?.content;
        if (!reply) return response({ error: "The AI returned an empty response. Please try again." }, 502, origin);
        return response({ reply }, 200, origin);
      } catch {
        return response({ error: "The AI service is temporarily unavailable. Please try again or contact the shop on WhatsApp." }, 502, origin);
      }
    }

    if (url.pathname === "/api/custom-design") {
      if (request.method !== "POST") return response({ error: "Method not allowed" }, 405, origin);
      if (!ALLOWED_ORIGINS.has(origin)) return response({ error: "Origin not allowed" }, 403);
      if (!env.CUSTOM_DESIGNS) return response({ error: "Upload storage is not configured" }, 503, origin);
      const length = Number(request.headers.get("Content-Length") || 0);
      if (length > MAX_FILE_BYTES + 64 * 1024) return response({ error: "Request too large (8 MB max)" }, 413, origin);
      let form;
      try { form = await request.formData(); } catch { return response({ error: "Please submit a valid upload form" }, 400, origin); }
      if (safeText(form.get("website"), 200)) return response({ error: "Request rejected" }, 400, origin);
      const phone = safeText(form.get("phone"), 40);
      const details = safeText(form.get("request"), 2000);
      const file = form.get("designFile");
      if (!phone || !details || !file || typeof file.arrayBuffer !== "function") return response({ error: "Phone, design details, and a file are required" }, 400, origin);
      if (!file.size || file.size > MAX_FILE_BYTES) return response({ error: "File must be between 1 byte and 8 MB" }, 413, origin);
      if (!ALLOWED_TYPES.has(file.type)) return response({ error: "Only PNG, JPG, WEBP, and PDF files are accepted" }, 415, origin);
      const id = crypto.randomUUID();
      const ext = ({ "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "application/pdf": "pdf" })[file.type];
      const key = `custom-designs/${new Date().toISOString().slice(0, 10)}/${id}.${ext}`;
      try {
        await env.CUSTOM_DESIGNS.put(key, await file.arrayBuffer(), {
          httpMetadata: { contentType: file.type, cacheControl: "private, no-store" },
          customMetadata: { requestId: id, phone, details, originalName: safeText(file.name, 120), receivedAt: new Date().toISOString() }
        });
      } catch { return response({ error: "Upload could not be saved. Please try again later." }, 500, origin); }
      return response({ ok: true, requestId: id, message: "Design received securely. Keep this reference for your enquiry." }, 201, origin);
    }

    if (env.ASSETS) return env.ASSETS.fetch(request);
    return new Response("ChitOo.Ai service is running.", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
};
