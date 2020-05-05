
export class CommonUtils {

    public static getOffsetLimit = (nextURL) => {
      return nextURL.split('/').pop();
    }

    // ascending sort by default
    public static sortArrayByKey = (arrayToSort: Array<any>, key: string, isDescending ?: boolean) => {
      const sortedArray = arrayToSort.sort( (current, next) => {
        current = current[key].toLowerCase();
        next = next[key].toLowerCase();
        return isDescending ? current > next ? -1 : current < next ? 1 : 0 :
        current < next ? -1 : current > next ? 1 : 0;
      });
      return sortedArray;
    }

}
