import { Component, OnInit } from '@angular/core';
import { PokeService } from './poke.service';
import { PokeList, MiniPokeList } from '../shared/Models/PokeTypes';
import { AppConstants } from '../shared/constants/app-constants';

@Component({
  selector: 'poke-theme',
  templateUrl: './poke-theme.component.html',
  styleUrls: ['./poke-theme.component.less']
})
export class PokeThemeComponent implements OnInit {

  public isLight: boolean;
  public pokeResponse: PokeList;
  pokeList: Array<MiniPokeList>
  constructor(private pokeService: PokeService) { }

  ngOnInit() {
    this.isLight = JSON.parse(localStorage.getItem(AppConstants.viewPreference));
    this.getPokeList();
  }

  getPokeList() {
    this.pokeService.getPokeList().subscribe(
      response => {
        this.pokeResponse = response;
        this.pokeList = response.results;
      },
      console.log
    );
  }

  toggleTheme() {
    this.isLight = !this.isLight;
    localStorage.setItem(AppConstants.viewPreference, JSON.stringify(this.isLight));
  }

}
