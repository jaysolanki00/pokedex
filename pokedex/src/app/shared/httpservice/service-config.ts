import { AppConstants } from '../constants/app-constants';

export class ServiceConfig {

  constructor() {
  }

  public static generatePokeAPIURL( endRequest ?: string ) {
    const server = AppConstants.APIURLS.pokemonAPI + 'pokemon/';
    return endRequest ? server + endRequest : server + '?offset=0&limit=964';
  }

}
