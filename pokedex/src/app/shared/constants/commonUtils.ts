export class CommonUtils {

  public static getOffsetLimit = (nextURL) => {
    return nextURL.split('/').pop();
  }

  // ascending sort by default
  public static sortArrayByKey = (arrayToSort: Array<any>, key: string, isDescending?: boolean) => {
    const sortedArray = arrayToSort.sort((current, next) => {
      current = current[key].toLowerCase();
      next = next[key].toLowerCase();
      return isDescending ? current > next ? -1 : current < next ? 1 : 0 :
        current < next ? -1 : current > next ? 1 : 0;
    });
    return sortedArray;
  }

  // ascending sort by default
  public static removeDuplicatesByKey = (arrayToCheck: Array<any>, key: string) => {
    const returningArray = [];
    arrayToCheck.forEach((element, index) => {
      const isKeyFound = returningArray.filter((ele) => ele[key] === element[key]);
      if (!isKeyFound || (isKeyFound && isKeyFound.length == 0)) {
        returningArray.push(element);
      }
    });
    return returningArray;
  }

  // ascending sort by default
  public static reverseArray = (arrayToCheck: Array<any>) => {
    return arrayToCheck.slice().reverse();
  }

}
