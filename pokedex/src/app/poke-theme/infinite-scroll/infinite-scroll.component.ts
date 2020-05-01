import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PokeList, Pokemon } from 'src/app/shared/Models/PokeTypes';

@Component({
  selector: 'poke-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.less']
})
export class InfiniteScrollComponent implements OnInit {

  @Input() pokeList: PokeList;
  @Output() scrolled = new EventEmitter();
  public pokemonArray: Array<Pokemon> = [];



  constructor() { }

  ngOnInit() {
  }

  onScroll() {
    this.scrolled.emit(this.pokemonArray);
  }

  setPokeDetailsInArray(pokemon: Pokemon) {
    if(this.pokemonArray.length === 0) {
      this.pokemonArray.push(pokemon);
    } else if (!(this.pokemonArray.find(poke => poke.id === pokemon.id ))) {
      this.pokemonArray.push(pokemon);
    }
  }


}
