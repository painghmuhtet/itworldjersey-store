/**
 * IT WORLD JERSEY — private custom-design upload API
 *
 * NOT DEPLOYED. Bind a PRIVATE R2 bucket named via CUSTOM_DESIGNS before use.
 * Email notification is intentionally not enabled until a legitimate sender/provider
 * is configured in Worker secrets.
 */
const MAX_FILE_BYTES = 8 * 1024 * 1024;
const ALLOWED_ORIGINS = new Set([
  "https://itworldjersey.store",
  "https://www.itworldjersey.store"
]);
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "application/pdf"]);

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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";

    if (request.method === "OPTIONS") {
      if (!ALLOWED_ORIGINS.has(origin)) return response({ error: "Origin not allowed" }, 403);
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
          "Vary": "Origin"
        }
      });
    }

    if (url.pathname !== "/api/custom-design") return response({ error: "Not found" }, 404, origin);
    if (request.method !== "POST") return response({ error: "Method not allowed" }, 405, origin);
    if (!ALLOWED_ORIGINS.has(origin)) return response({ error: "Origin not allowed" }, 403);
    if (!env.CUSTOM_DESIGNS) return response({ error: "Upload storage is not configured" }, 503, origin);

    const length = Number(request.headers.get("Content-Length") || 0);
    if (length > MAX_FILE_BYTES + 64 * 1024) return response({ error: "Request too large (8 MB max)" }, 413, origin);

    let form;
    try { form = await request.formData(); }
    catch { return response({ error: "Please submit a valid upload form" }, 400, origin); }

    // Honeypot field for basic bot filtering.
    if (safeText(form.get("website"), 200)) return response({ error: "Request rejected" }, 400, origin);

    const phone = safeText(form.get("phone"), 40);
    const details = safeText(form.get("request"), 2000);
    const file = form.get("designFile");

    if (!phone || !details || !file || typeof file.arrayBuffer !== "function") {
      return response({ error: "Phone, design details, and a file are required" }, 400, origin);
    }
    if (!file.size || file.size > MAX_FILE_BYTES) return response({ error: "File must be between 1 byte and 8 MB" }, 413, origin);
    if (!ALLOWED_TYPES.has(file.type)) return response({ error: "Only PNG, JPG, WEBP, and PDF files are accepted" }, 415, origin);

    const id = crypto.randomUUID();
    const ext = ({ "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "application/pdf": "pdf" })[file.type];
    const key = `custom-designs/${new Date().toISOString().slice(0, 10)}/${id}.${ext}`;

    try {
      await env.CUSTOM_DESIGNS.put(key, await file.arrayBuffer(), {
        httpMetadata: { contentType: file.type, cacheControl: "private, no-store" },
        customMetadata: {
          requestId: id,
          phone,
          details,
          originalName: safeText(file.name, 120),
          receivedAt: new Date().toISOString()
        }
      });
    } catch {
      return response({ error: "Upload could not be saved. Please try again later." }, 500, origin);
    }

    // Deliberately no public URL is returned. The bucket must remain private.
    // Email notifications should be added only after a sender/provider is configured.
    return response({
      ok: true,
      requestId: id,
      message: "Design received securely. Keep this reference for your enquiry."
    }, 201, origin);
  }
};
