import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
  const url = 'https://real-time-product-search.p.rapidapi.com/product-offers';

  // Optionally, get lat/lng from query params (not used in this API, but for future use)
  // const { searchParams } = new URL(req.url);
  // const lat = searchParams.get('lat');
  // const lng = searchParams.get('lng');

  // Example: fetch offers for a default product (Nike Dunk Low)
  const params = new URLSearchParams({
    product_id: 'catalogid:15554707778480471208,gpcid:6219277726645206819,headlineOfferDocid:8835386203856143595',
    page: '1',
    country: 'us',
    language: 'en',
  });

  const res = await fetch(`${url}?${params.toString()}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apiKey!,
      'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com',
    },
  });

  const data = await res.json();
  return NextResponse.json({ offers: data.data?.offers || [] });
} 