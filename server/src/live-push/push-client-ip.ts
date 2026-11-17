import { isIP } from 'node:net';
import * as ipaddr from 'ipaddr.js';

const PROXY_RANGES = ['private', 'loopback', 'uniqueLocal', 'linkLocal'];

function isProxyAddress(address: string): boolean {
  try {
    return PROXY_RANGES.includes(ipaddr.process(address).range());
  } catch {
    return false;
  }
}

/**
 * Throttle tracker for the push controller only. The server runs behind
 * Traefik without `trust proxy`, so `req.ip` is Traefik's address for every
 * phone. Traefik drops untrusted X-Forwarded-For values and appends the real
 * client address, so the last entry is used, and only when the request came
 * from a private (proxy) address. Direct requests keep `req.ip`.
 */
export function pushClientTracker(req: Record<string, any>): string {
  const peer: string = req.socket?.remoteAddress || req.ip || '';
  const header = req.headers?.['x-forwarded-for'];
  const forwarded = (Array.isArray(header) ? header.join(',') : header || '')
    .split(',')
    .map((value: string) => value.trim())
    .filter(Boolean);
  const nearest = forwarded[forwarded.length - 1];
  if (nearest && isIP(nearest) && isProxyAddress(peer)) return nearest;
  return req.ip || peer;
}
