import { Component, OnInit } from '@angular/core';
import { PokeService } from './poke.service';
import { PokeList, MiniPokeList, Pokemon } from '../shared/Models/PokeTypes';
import { AppConstants } from '../shared/constants/app-constants';
import { CommonUtils } from '../shared/constants/commonUtils';

@Component({
  selector: 'poke-theme',
  templateUrl: './poke-theme.component.html',
  styleUrls: ['./poke-theme.component.less']
})
export class PokeThemeComponent implements OnInit {

  public isLight: boolean;
  public currentPokeResponse: PokeList;
  private pokeResponse: PokeList;
  public pokeList: Array<MiniPokeList>;
  public isInitialLoading: boolean;
  public pokeFindAcc: string;
  public pokemonArray: Array<Pokemon>;
  public currentPokeList: Array<MiniPokeList>;
  public errorMessage: string;

  constructor(private pokeService: PokeService) { }

  ngOnInit() {
    this.isLight = JSON.parse(localStorage.getItem(AppConstants.themePreference));
    this.isInitialLoading = true;
    this.getPokeList();
  }

  getPokeList() {
    this.pokeService.getPokeList().subscribe(
      response => {
        this.currentPokeResponse = response;
        this.pokeResponse = response;
        this.pokeList = response.results.filter((p, i) => i < 20 );
        this.currentPokeList = response.results.filter((p, i) => i < 20 );
        const a = CommonUtils.sortArrayByKey(response.results, 'name');
      },
       e => {
        this.serviceCallToGetNextList(AppConstants.APIURLS.pokeFailSafeUrl);
      },
      () => this.isInitialLoading = false
    );
  }

  toggleTheme() {
    this.isLight = !this.isLight;
    localStorage.setItem(AppConstants.themePreference, JSON.stringify(this.isLight));
  }

  getNextPokeList(pokemons: Array<Pokemon>) {
    this.pokemonArray = pokemons;
    this.pokeService.pokeMasterData = this.pokemonArray;
    console.log(this.pokeService.pokeMasterData);
    if ((this.pokeFindAcc == '' || !this.pokeFindAcc )) {
      const nextURL = this.currentPokeResponse.next ? this.currentPokeResponse.next : AppConstants.APIURLS.pokeNextUrl;
      this.serviceCallToGetNextList(nextURL);
    }
  }

  serviceCallToGetNextList(nextURL) {
    this.pokeService.getNextPokeList(nextURL).subscribe(
      response => {
        this.currentPokeResponse = response;
        this.pokeResponse.next = response.next;
        this.pokeResponse.previous = response.previous;
        this.pokeResponse.results = this.pokeResponse.results.concat(response.results);
        this.pokeList = this.pokeList.concat(response.results);
      },
      console.log
    );
  }

  pokeSearch() {
    const results = this.pokeService.pokeMiniMasterList.results;
    if (results && results.length > 0 && this.pokeFindAcc) {
      this.pokeList = results.filter( (poke, i) => poke.name.toLowerCase().includes(this.pokeFindAcc.toLowerCase()) ||
        String(i) == this.pokeFindAcc );
      if (this.pokeList.length <= 0) {
        this.errorMessage = 'No Results Found !';
      }
    } else if (this.pokeFindAcc == '') {
      this.pokeList = this.currentPokeList;
    }
  }
}
