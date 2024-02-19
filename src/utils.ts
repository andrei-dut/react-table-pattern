// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getPropertyByString = (propertyString: string, obj: any) => {
  const properties = propertyString.split('.');
  let currentObject = obj;

  for (const property of properties) {
    if (currentObject && Object.prototype.hasOwnProperty.call(currentObject, property)) {
      currentObject = currentObject[property as keyof typeof obj];
    } else {
      return undefined;
    }
  }

  return currentObject;
};
