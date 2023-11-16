import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  if (request.headers.get('Accept')?.includes('text/html')) {
    response.headers.set(
      'Accept-CH',
      `Sec-CH-Prefers-Color-Scheme, Sec-CH-Prefers-Contrast`,
    );
    response.headers.set('Vary', 'Sec-CH-Prefers-Color-Scheme');
    response.headers.set('Critical-CH', 'Sec-CH-Prefers-Color-Scheme');
    return response;
  }

  const preference = request.headers.get('Sec-CH-Prefers-Color-Scheme');
  const theme = request.cookies.get('theme');
  if (preference && !theme) {
    response.cookies.set('theme', preference);
    return response;
  }
  return response;
}