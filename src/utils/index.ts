import pathToRegexp from 'path-to-regexp';
import type { Path, Key, RegExpOptions } from 'path-to-regexp';

export interface MenuConfig {
  activePath: string;
  exact?: boolean;
  strict?: boolean;
  sensitive?: boolean;
}

function genPath2RegExp(path: Path, regExpOptions: RegExpOptions) {
  const keys: Key[] = [];
  const regexp = pathToRegexp(path, keys, regExpOptions);
  return { regexp, keys };
}

function checkActive(pathname: string, menuConfig: MenuConfig) {
  const { activePath, exact = false, strict = false, sensitive = false } = menuConfig;
  const { regexp } = genPath2RegExp(activePath, {
    strict,
    sensitive,
    end: exact,
  });

  const match = regexp.exec(pathname);

  if (!match) {
    return false;
  }
  return true;
}

export {
  genPath2RegExp,
  checkActive,
};
