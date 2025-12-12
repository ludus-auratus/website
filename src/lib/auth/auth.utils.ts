export async function signUp() {
  const { origin, pathname } = document.location;
  const fromUrl = new URL(pathname, origin);
  const toUrl = new URL("/register", origin);
  toUrl.searchParams.set("callbackUrl", fromUrl.toString() ?? "/");
  window.location.href = toUrl.toString();
}

export function getUserAbbreviation(name?: string) {
  if (name === undefined) return "us";
  const splittedName = name.split(" ");
  if (splittedName.length === 1) return splittedName[0].slice(0, 2);
  return splittedName[0].charAt(0) + splittedName[splittedName.length - 1].charAt(0);
}
