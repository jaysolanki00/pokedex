import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/shared/Models/PokeTypes';

@Component({
  selector: 'poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.less']
})
export class PokeCardComponent implements OnInit {

  @Input() pokemon: Pokemon;

  constructor() { }

  ngOnInit() {
  }

}
