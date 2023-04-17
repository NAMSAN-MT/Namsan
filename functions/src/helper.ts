import {TextEncoder, TextDecoder} from "util";

export const getSummary = (str: string) => {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);

  if (bytes.length <= 500) return str;

  const truncatedBytes = bytes.slice(0, 500);
  const decoder = new TextDecoder();
  const truncatedString = decoder.decode(truncatedBytes);
  return truncatedString;
};

/* eslint-disable no-useless-escape */
export const minifyBytes = (str: string) => {
  const encoder = new TextEncoder();
  const specialTypeReg =
    /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"”“‘’·…]/gi;
  const _str = str.replace(specialTypeReg, "").replace(/\s/g, "");
  const bytes = encoder.encode(_str);
  const decoder = new TextDecoder();
  const truncatedString = decoder.decode(bytes);
  return truncatedString;
};

export const cutStringTo1000Bytes = (myString: string) => {
  const encoder = new TextEncoder();
  // eslint-disable-next-line
  const specialTypeReg =
    /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"”“‘’·…]/gi;
  const str = myString.replace(specialTypeReg, "").replace(/\s/g, "");
  const bytes = encoder.encode(str);

  if (bytes.length <= 800) {
    return [str];
  }

  const numChunks = Math.ceil(bytes.length / 800);
  const truncatedStrings = [];

  for (let i = 0; i < numChunks; i++) {
    const start = i * 800;
    const end = start + 800;
    const truncatedBytes = bytes.slice(start, end);
    const decoder = new TextDecoder();
    const truncatedString = decoder.decode(truncatedBytes);
    truncatedStrings.push(truncatedString);
  }

  return truncatedStrings;
};

export const contentReduce = (recordList: string[]) => {
  return recordList.reduce((acc, cur, index) => {
    return {...acc, [`content${index + 1}`]: cur};
  }, {});
};
