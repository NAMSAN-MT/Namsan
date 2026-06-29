const isBrowser = typeof window !== 'undefined';

const getCurrentMenu = (): string => {
  if (!isBrowser) {
    return '';
  }

  const { pathname } = document.location;
  const [, path] = pathname.split('/');
  return path;
};

export { getCurrentMenu };
