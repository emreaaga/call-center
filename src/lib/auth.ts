export function getTokenFromCookie(): string | null {
  // простая парсилка document.cookie
  const match = document.cookie.match(/(?:^|; )token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}
