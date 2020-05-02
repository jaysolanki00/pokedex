
export class CommonUtils {

    public static getOffsetLimit = (nextURL) => {
      return nextURL.split('/').pop();
    }

    public static sortArrayByKey = (arrayToSort: Array<any>, key: string) => {
      const sortedArray = arrayToSort.sort( (current, next) => {
        current = current[key].toLowerCase();
        next = next[key].toLowerCase();
        return current < next ? -1 : current > next ? 1 : 0;
      });
      return sortedArray;
    }

}
