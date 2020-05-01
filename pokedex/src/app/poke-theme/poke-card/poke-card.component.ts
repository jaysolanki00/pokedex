import { Component, OnInit, Input } from '@angular/core';
import { Pokemon, MiniPokeList } from 'src/app/shared/Models/PokeTypes';
import { PokeService } from '../poke.service';

@Component({
  selector: 'poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.less']
})
export class PokeCardComponent implements OnInit {

  public pokemon: Pokemon;
  @Input() miniPokemon: MiniPokeList;

  constructor(private pokeService: PokeService) { }

  ngOnInit() {
    this.getPokeDetails();
  }

  getPokeDetails() {
    this.pokeService.getPokeDetails(this.miniPokemon.url).subscribe(
      response => {
        this.pokemon = response;
      },
      console.log
    )
  }

}
