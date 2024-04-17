const isObject = (value: unknown): value is Record<string, unknown> =>
  Object.prototype.toString.call(value) === "[object Object]";

const isArray = (value: unknown): value is Array<unknown> =>
  Array.isArray(value);

type StringIndexed = Record<string, unknown>;

export const trim = (str: string, toRemove?: string) => {
  let specSymbol;
  let regExp;

  if (toRemove !== undefined) {
    const arr = toRemove.split("");
    if (arr.length) {
      specSymbol = "\\" + arr.join("\\");
    } else {
      specSymbol = "";
    }
  }

  if (specSymbol) {
    regExp = new RegExp(`^[${specSymbol}]+|[${specSymbol}]+$`, "g");
  } else {
    regExp = new RegExp("^[\\s]+|[\\s]+$", "g");
  }

  return str.replace(regExp, "");
};

export const merge = (target: StringIndexed, source: StringIndexed) => {
  if (!isObject(source)) return target;

  if (isObject(target) && isObject(source)) {
    Object.entries(source).forEach(([key, value]) => {
      if (isObject(value)) {
        if (!target[key]) {
          Object.assign(target, {
            [key]: {},
          });
        }
        merge(target[key] as StringIndexed, value as StringIndexed);
      } else {
        Object.assign(target, {
          [key]: source[key],
        });
      }
    });
  }

  return target;
};

export const set = (
  obj: StringIndexed,
  path: string,
  value: unknown,
): unknown => {
  if (!isObject(obj)) return obj;

  const arr = path.split(".");
  const fn = (obj: Record<string, unknown>) => {
    const pathEl = arr.shift();
    if (arr.length && pathEl) {
      if (!obj[pathEl]) {
        obj[pathEl] = {};
      }
      fn(obj[pathEl] as StringIndexed);
    } else {
      if (pathEl) {
        obj[pathEl] = value;
      } else {
        return obj;
      }
    }
  };
  fn(obj);

  return obj;
};

export const deepCompare = (a: unknown, b: unknown): boolean => {
  const isObject = (value: unknown) =>
    Object.prototype.toString.call(value) === "[object Object]";

  const objOrArr = (a: unknown, b: unknown) =>
    (isObject(a) && isObject(b)) || (Array.isArray(a) && Array.isArray(b));

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((el, i) => {
      if (objOrArr(el, b[i])) {
        return deepCompare(el as StringIndexed | Array<unknown>, b[i]);
      } else {
        return el === b[i];
      }
    });
  }

  if (!isObject(a) && !isObject(b)) {
    return a === b;
  }

  if (
    Object.keys(a as StringIndexed).length !==
    Object.keys(b as StringIndexed).length
  ) {
    return false;
  }

  return Object.entries(a as StringIndexed).every(([key, value]) => {
    if (objOrArr(value, (b as StringIndexed)[key])) {
      return deepCompare(value, (b as Record<string, unknown>)[key]);
    } else {
      return value === (b as Record<string, unknown>)[key];
    }
  });
};

export const queryStringify = (data: StringIndexed): string | never => {
  if (typeof data !== "object") {
    throw new Error("'input must be an object'");
  }

  let query: string = "";

  const callBack = (data: StringIndexed, initString = "") => {
    Object.entries(data).forEach(([key, value]) => {
      if (isArray(value) || isObject(value)) {
        if (isArray(value)) {
          value.forEach((el: unknown, i: number) => {
            if (isObject(el)) {
              callBack(el, `${initString}[${key}][${i}]`);
            } else {
              query =
                query +
                `${initString ? initString + `[${key}]` : `${key}`}[${i}]=${el}&`;
            }
          });
        }
        if (isObject(value)) {
          callBack(value, `${initString}${initString ? `[${key}]` : `${key}`}`);
        }
      } else {
        query =
          query +
          `${initString ? initString + `[${key}]` : `${key}`}=${value}&`;
      }
    });
  };
  callBack(data);

  return `?${query.slice(0, -1)}`;
};
