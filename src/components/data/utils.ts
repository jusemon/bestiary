import { DataTypeBase } from './types';
export function recursiveValueSearch(list: DataTypeBase[], value: string): DataTypeBase[] | undefined {
  for (const el of list) {
    if (Array.isArray(el.data) || !el.data.value) {
      continue;
    }
    if (typeof el.data.value !== 'string') {
      const result = recursiveValueSearch(el.data.value, value);
      if (result) {
        return result;
      }
    } else {
      if (el.data.value.toLowerCase() === value.toLowerCase()) {
        return list;
      }
    }
  }
}

export function clearHtml(value: string) {
  const el = document.createElement('div');
  el.innerHTML = value;
  return el.textContent || el.innerHTML;
}

export function getGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}