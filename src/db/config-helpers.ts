import { AppContext } from '../server';

export function isAdminOrEditor(ctx: AppContext) {
  const user = ctx.get('user');
  const role = user?.role?.toLowerCase() || '';
  if (role === 'admin' || role === 'editor') {
    return true;
  }
  return false;
}

export function isAdmin(ctx: AppContext) {
  const user = ctx.get('user');
  const role = user?.role?.toLowerCase() || '';
  if (role === 'admin') {
    return true;
  }
  return false;
}

export function isUser(ctx: AppContext, id: string) {
  const user = ctx.get('user');
  return user?.userId === id;
}

export function isAdminOrUser(ctx: AppContext, id: string) {
  return isAdmin(ctx) || isUser(ctx, id);
}

export const slugify = (value: string, separator: string = '-'): string => {
  const mapAccentsHex: any = {
    a: /[\xE0-\xE6]/g,
    A: /[\xC0-\xC6]/g,
    e: /[\xE8-\xEB]/g,
    E: /[\xC8-\xCB]/g,
    i: /[\xEC-\xEF]/g,
    I: /[\xCC-\xCF]/g,
    o: /[\xF2-\xF6]/g,
    O: /[\xD2-\xD6]/g,
    u: /[\xF9-\xFC]/g,
    U: /[\xD9-\xDC]/g,
    c: /\xE7/g,
    C: /\xC7/g,
    n: /\xF1/g,
    N: /\xD1/g
  };

  for (let letter in mapAccentsHex) {
    let regularExpression = mapAccentsHex[letter];
    value = value.replace(regularExpression, letter);
  }

  value = value.toLowerCase();
  value = value.replace(/[^a-z0-9\-]/g, ' ');

  value = value.replace(/ {2,}/g, ' ');

  value = value.trim();
  value = value.replace(/\s/g, separator);

  return value;
};
