import { NextRequest, NextResponse } from "next/server";
import { getStoreDeepLink } from "@/src/lib/fatcoupon";

interface RouteParams {
  storeId: string;
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<RouteParams> }
) {
  const params = await context.params;
  const { storeId } = params;
  console.log("[GoRoute] Raw params", params);
  console.log("[GoRoute] Incoming request for storeId", storeId);

  const deepLink = await getStoreDeepLink(storeId);

  if (deepLink) {
    console.log("[GoRoute] Redirecting to", deepLink);
    return NextResponse.redirect(deepLink);
  }

  console.warn("[GoRoute] No redirect URL found for", storeId);

  return NextResponse.json(
    {
      storeId,
      error: "No redirect URL found",
    },
    { status: 404 }
  );
}
