type MatchPathResult =
  | {
      match: true;
      params: Record<string, string>;
    }
  | { match: false; params: object };

export function matchPath(pattern: string, path: string): MatchPathResult {
  const regexPattern = pattern
    .replace(/:\w+/g, '([^/]+)')
    .replace(/\//g, '\\/');

  const regex = new RegExp(`^${regexPattern}$`);
  const match = path.match(regex);

  if (match) {
    const keys = (pattern.match(/:\w+/g) || []).map((key) => key.slice(1));
    const values = match.slice(1);

    const params: Record<string, string> = {};
    keys.forEach((key, index) => {
      params[key] = values[index];
    });

    return { match: true, params };
  }

  return { match: false, params: {} };
}
