import { Component, OnInit } from '@angular/core';
import { PokeService } from './poke.service';
import { PokeList, MiniPokeList, Pokemon } from '../shared/Models/PokeTypes';
import { AppConstants } from '../shared/constants/app-constants';

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

  constructor(private pokeService: PokeService) { }

  ngOnInit() {
    this.isLight = JSON.parse(localStorage.getItem(AppConstants.viewPreference));
    this.isInitialLoading = true;
    this.getPokeList();
  }

  getPokeList() {
    this.pokeService.getPokeList().subscribe(
      response => {
        this.currentPokeResponse = response;
        this.pokeResponse = response;
        this.pokeList = response.results;
        this.currentPokeList = response.results;
      },
      console.log,
      () => this.isInitialLoading = false
    );
  }

  toggleTheme() {
    this.isLight = !this.isLight;
    localStorage.setItem(AppConstants.viewPreference, JSON.stringify(this.isLight));
  }

  getNextPokeList(pokemons: Array<Pokemon>) {
    this.pokemonArray = pokemons;
    if (this.currentPokeResponse && this.currentPokeResponse.next && (this.pokeFindAcc == '' || !this.pokeFindAcc )) {
      this.pokeService.getNextPokeList(this.currentPokeResponse.next).subscribe(
        response => {
          this.currentPokeResponse = response;
          this.pokeResponse.next = response.next;
          this.pokeResponse.previous = response.previous;
          this.pokeResponse.results = this.pokeResponse.results.concat(response.results);
          this.pokeList = this.pokeList.concat(response.results);
          this.currentPokeList = this.currentPokeList.concat(response.results);
        },
        console.log
      );
    }
  }

  pokeSearch() {
    if (this.currentPokeList && this.currentPokeList.length > 0 && this.pokeFindAcc) {
      this.pokeList = this.currentPokeList.filter( poke => poke.name.toLowerCase().includes(this.pokeFindAcc.toLowerCase()) );
      if (this.pokeList.length <= 0) {
        console.log('Search API');
        
      }
    }else if (this.pokeFindAcc == '') {
      this.pokeList = this.currentPokeList
    }
  }
}
