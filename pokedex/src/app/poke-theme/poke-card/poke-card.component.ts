import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Pokemon, MiniPokeList } from 'src/app/shared/Models/PokeTypes';
import { PokeService } from '../poke.service';
import { Router } from '@angular/router';

@Component({
  selector: 'poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.less']
})
export class PokeCardComponent implements OnInit {

  public pokemon: Pokemon;
  public pokemonArray: Array<Pokemon> = [];
  public isLoading: boolean;

  @Input() miniPokemon: MiniPokeList;
  @Output() pokemonDetails = new EventEmitter();


  constructor(private pokeService: PokeService, private router: Router) { }

  ngOnInit() {
    this.getPokeDetails();
  }

  getPokeDetails() {
    if(this.pokeService.pokeMasterData && this.pokeService.pokeMasterData.length > 0 && this.miniPokemon) {
      this.pokemon = this.pokeService.pokeMasterData.find(poke => poke.name == this.miniPokemon.name );
    }
    if (!this.pokemon) {
      this.isLoading = true;
      this.pokeService.getPokeDetails(this.miniPokemon.url).subscribe(
        response => {
          this.isLoading = false;
          this.pokemon = response;
          this.pokemon.knownAbilities = this.pokemon.abilities.filter( ability => !ability.is_hidden )
          this.getPokemonSpeciesDetails(response.species.url);
          if (response.id) {
            const orderStr = String(response.id);
            this.pokemon.pokedexNumber = orderStr.length == 1 ? `00${orderStr}` :
            orderStr.length == 2 ? `0${orderStr}` : orderStr ;
          }
        },
        console.log,
        () => this.isLoading = false
      );
    }
  }


  getPokemonSpeciesDetails(url) {
    this.pokeService.getPokemonSpeciesDetails(url).subscribe(
      (response: any) => {
        this.pokemon.pokeSpecies = response;
        this.getPokemonEvolutionDetails(response.evolution_chain.url);
      },
      console.log
    );
  }

  getPokemonEvolutionDetails(url: string) {
    this.pokeService.getPokemonEvolutionDetails(url).subscribe(
      response => {
        this.pokemon.pokeEvolution = response;
        this.pokemonDetails.emit(this.pokemon);
      },
      console.log
    );
  }

  errorImage(elem, url) {
    elem.src = url;
    elem.style.height = elem.style.width = '96px';
    elem.style.marginTop = '60px';
  }

}
