import {TextEncoder, TextDecoder} from "util";

/* eslint-disable no-useless-escape */
export const cutStringTo1000Bytes = (myString: string) => {
  const encoder = new TextEncoder();
  // eslint-disable-next-line
  const specialTypeReg =
    /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"”“‘’·…]/gi;
  const str = myString.replace(specialTypeReg, "").replace(/\s/g, "");
  const bytes = encoder.encode(str);

  if (bytes.length <= 1000) {
    return [str];
  }

  const numChunks = Math.ceil(bytes.length / 1000);
  const truncatedStrings = [];

  for (let i = 0; i < numChunks; i++) {
    const start = i * 1000;
    const end = start + 1000;
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
