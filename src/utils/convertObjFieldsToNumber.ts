export const convertFieldsToNumber = (obj: any): any => {
  const result: any = {};
  for (const key in obj) {
    if (typeof obj[key] === "string") {
      const num = parseFloat(obj[key]);
      result[key] = isNaN(num) ? obj[key] : num;
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};