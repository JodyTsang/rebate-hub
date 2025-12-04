const FATCOUPON_BASE_URL = "https://api.partner.fatcoupon.com";
import { storeCategories } from "@/src/config/storeCategories";

export interface Merchant {
  id: number;
  name: string;
  cashbackType?: string;
  domain?: string;
  createdAt?: string;
  updatedAt?: string;
  affCommissionRate?: string;
  image?: string;
  country?: string;
  description?: string;
  cashbackDesc?: string;
  categories?: string[];
}

export interface MerchantPage {
  items: Merchant[];
  page: number;
  size: number;
  total: number;
  count: number;
  error?: string;
}

interface GetMerchantsOptions {
  page: number;
  size: number;
  search?: string;
  categoryId?: number; // reserved for future use if API exposes real categories
}

function getBasicToken(): string | null {
  const username = process.env.FATCOUPON_USERNAME;
  const password = process.env.FATCOUPON_PASSWORD;

  if (!username || !password) {
    console.error("FATCOUPON_USERNAME or FATCOUPON_PASSWORD is not set");
    return null;
  }

  return Buffer.from(`${username}:${password}`).toString("base64");
}

function mapMerchant(raw: any): Merchant {
  const mappedCategories = storeCategories[raw.id] ?? ["Others"];
  return {
    id: raw.id,
    name: raw.name,
    cashbackType: raw.cashbackType,
    domain: raw.domain,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
    affCommissionRate: raw.affCommissionRate,
    image: raw.image,
    country: raw.country,
    description: raw.description,
    cashbackDesc: raw.cashbackDesc,
    categories: mappedCategories,
  };
}

export async function getMerchants(
  options: GetMerchantsOptions
): Promise<MerchantPage> {
  const basicToken = getBasicToken();
  const fallback: MerchantPage = {
    items: [],
    page: options.page,
    size: options.size,
    total: 0,
    count: 0,
  };

  if (!basicToken) {
    return { ...fallback, error: "Authentication for FatCoupon API is not configured." };
  }

  const { page, size, search } = options;

  const url = new URL("/api/stores", FATCOUPON_BASE_URL);
  url.searchParams.set("page", String(page));
  url.searchParams.set("size", String(size));
  if (search && search.trim().length > 0) {
    url.searchParams.set("search", search.trim());
  }

  const requestUrl = url.toString();

  console.log("[FatCoupon] getMerchants", {
    page,
    size,
    search: search ?? null,
    url: requestUrl,
  });

  const res = await fetch(requestUrl, {
    method: "GET",
    headers: {
      Authorization: `Basic ${basicToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("[FatCoupon] getMerchants API error", res.status, body);
    return {
      ...fallback,
      error: `Failed to load stores from FatCoupon (status ${res.status}).`,
    };
  }

  let json: any;
  try {
    json = await res.json();
  } catch (error) {
    console.error("[FatCoupon] getMerchants parse error", error);
    return { ...fallback, error: "Failed to parse FatCoupon store response." };
  }

  const data = json?.data;
  const rawItems: any[] = Array.isArray(data?.data) ? data.data : [];
  const items: Merchant[] = rawItems.map(mapMerchant);

  const compact = items.map((m) => ({ id: m.id, name: m.name, domain: m.domain ?? "" }));
  console.log("[FatCoupon] Merchants (JSON)", JSON.stringify(compact, null, 2));
  console.log(
    "[FatCoupon] Merchants (CSV)\n" +
      ["id,name,domain", ...compact.map((m) => `${m.id},"${m.name.replace(/"/g, '""')}",${m.domain}`)].join("\n")
  );

  return {
    items,
    page: data?.page ?? page,
    size: data?.size ?? size,
    total: data?.total ?? items.length,
    count: data?.count ?? items.length,
  };
}

export async function getMerchantById(id: number): Promise<Merchant | null> {
  const basicToken = getBasicToken();
  if (!basicToken) {
    return null;
  }

  const url = new URL("/api/stores", FATCOUPON_BASE_URL);
  url.searchParams.set("id", String(id));
  url.searchParams.set("page", "1");
  url.searchParams.set("size", "1");

  const requestUrl = url.toString();
  console.log("[FatCoupon] getMerchantById request", {
    id,
    url: requestUrl,
  });

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Basic ${basicToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    console.error("[FatCoupon] getMerchantById API error", {
      status: res.status,
      url: requestUrl,
      body: errorBody,
    });
    return null;
  }

  let json: any;
  try {
    json = await res.json();
  } catch (error) {
    console.error("[FatCoupon] getMerchantById parse error", {
      error,
      url: requestUrl,
    });
    return null;
  }

  const raw = json?.data?.data?.[0];
  if (!raw) {
    console.warn("[FatCoupon] getMerchantById no merchant in response", {
      id,
      url: requestUrl,
      json,
    });
    return null;
  }

  console.log("[FatCoupon] getMerchantById raw merchant", JSON.stringify(raw, null, 2));

  return mapMerchant(raw);
}

// Keep existing redirect helper, now built on top of /api/stores with fallback search logic.
export async function getStoreDeepLink(
  storeIdOrDomain: string
): Promise<string | null> {
  const basicToken = getBasicToken();
  if (!basicToken) {
    return null;
  }

  const candidates: string[] = [];

  const original = storeIdOrDomain.trim();
  if (original) {
    candidates.push(original);
  }

  const lower = original.toLowerCase();
  const withoutProtocol = lower.replace(/^https?:\/\//, "");
  const withoutWww = withoutProtocol.replace(/^www\./, "");
  const basePart = withoutWww.split("/")[0].split(".")[0];
  if (basePart && !candidates.includes(basePart)) {
    candidates.push(basePart);
  }

  console.log("[FatCoupon] Search candidates", candidates);

  for (const search of candidates) {
    const url = new URL("/api/stores", FATCOUPON_BASE_URL);
    url.searchParams.set("search", search);
    url.searchParams.set("page", "1");
    url.searchParams.set("size", "1");

    console.log("[FatCoupon] Requesting merchant", {
      search,
      url: url.toString(),
    });

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Basic ${basicToken}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("[FatCoupon] API error", res.status, await res.text());
      if (res.status >= 500 || res.status === 401 || res.status === 403) {
        return null;
      }
      continue;
    }

    let json: any;
    try {
      json = await res.json();
    } catch (error) {
      console.error("[FatCoupon] Failed to parse API response", error);
      continue;
    }

    const merchant = json?.data?.data?.[0];
    if (!merchant) {
      console.warn("[FatCoupon] No merchant found for search", search);
      continue;
    }

    const mid = merchant.id;
    const merchantUrl: string | undefined =
      merchant.urls?.[0]?.url ?? merchant.domain;

    if (!mid || typeof merchantUrl !== "string" || merchantUrl.length === 0) {
      console.warn("[FatCoupon] Missing mid or merchantUrl", {
        mid,
        merchantUrl,
        merchant,
      });
      continue;
    }

    const wrapperUrl = new URL(
      "https://redirect.partner.fatcoupon.com/go"
    );
    wrapperUrl.searchParams.set("cid", "392");
    wrapperUrl.searchParams.set("mid", String(mid));
    wrapperUrl.searchParams.set("url", merchantUrl);

    const finalUrl = wrapperUrl.toString();
    console.log("[FatCoupon] Built Link Wrapper URL", finalUrl);

    return finalUrl;
  }

  console.warn("[FatCoupon] No merchant matched any search candidate", candidates);
  return null;
}
