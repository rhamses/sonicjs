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

export const slugify = (text: string): string => {
  return text
    .toString() // Cast to string (optional)
    .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\_/g, '-') // Replace _ with -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/\-$/g, ''); // Remove trailing -
};
