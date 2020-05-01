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
    this.pokeService.getPokeDetails(this.miniPokemon.url).subscribe(
      response => {
        this.pokemon = response;
        this.pokemonDetails.emit(response);
      },
      console.log
    );
  }

}
