
export class CommonUtils {

    public static getOffsetLimit = (nextURL) => {
      return nextURL.split('/').pop();
    }

}
