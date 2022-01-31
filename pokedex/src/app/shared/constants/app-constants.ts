export class AppConstants {

  public static APIURLS = {
    pokemonAPI:  'https://pokeapi.co/api/v2/',
    pokeNextUrl: 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
    pokeFailSafeUrl: 'https://pokeapi.co/api/v2/pokemon/',
    pokeTypeUrl: 'https://pokeapi.co/api/v2/type/'
  };

  public static themePreference = 'isPokeViewLight';
  public static viewPreference = 'isPokeViewGrid';
  public static typeDetailsArray = 'pokeTypeDetailsArray';


  public static pokeOffsetLimit = 20;

}
