import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Pokemon, MiniPokeList } from 'src/app/shared/Models/PokeTypes';
import { PokeService } from '../poke.service';

@Component({
  selector: 'poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.less']
})
export class PokeCardComponent implements OnInit {

  public pokemon: Pokemon;
  public pokemonArray: Array<Pokemon> = [];

  @Input() miniPokemon: MiniPokeList;
  @Output() pokemonDetails = new EventEmitter();


  constructor(private pokeService: PokeService) { }

  ngOnInit() {
    this.getPokeDetails();
  }

  getPokeDetails() {
    if(this.pokeService.pokeMasterData && this.pokeService.pokeMasterData.length > 0 && this.miniPokemon) {
      this.pokemon = this.pokeService.pokeMasterData.find(poke => poke.name == this.miniPokemon.name );
    }
    if (!this.pokemon) {
      this.pokeService.getPokeDetails(this.miniPokemon.url).subscribe(
        response => {
          this.pokemon = response;
          if (response.id) {
            const orderStr = String(response.id);
            this.pokemon.pokedexNumber = orderStr.length == 1 ? `00${orderStr}` :
            orderStr.length == 2 ? `0${orderStr}` : orderStr ;
          } 
          this.pokemonDetails.emit(response);
        },
        console.log
      );
    }
  }

}
