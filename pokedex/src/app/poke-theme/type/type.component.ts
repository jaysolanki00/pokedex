import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from 'src/app/shared/constants/app-constants';
import { PokeService } from '../poke.service';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'poke-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.less']
})
export class TypeComponent implements OnInit {

  public selectedType: string;
  public isLight: boolean;
  public typeDetails: any;

  constructor(private route: ActivatedRoute, private pokeService: PokeService) {
    route.params.subscribe(param => {
      this.selectedType = param.pokeType;
    });
   }

  ngOnInit() {
    this.isLight = JSON.parse(localStorage.getItem(AppConstants.themePreference));
    this.initiateProcess();
  }

  initiateProcess() {
    this.typeDetails = null;
    const existingTypes: Array<any> = JSON.parse(localStorage.getItem(AppConstants.typeDetailsArray));
    if (existingTypes) {
      existingTypes.forEach(type => {
        if (this.selectedType == type.name) {
          this.typeDetails = type;
        }
      });
    }
    if( this.typeDetails === null) {
      this.getTypeDetails();
    }
  }

  getTypeDetails() {
    const url = `${AppConstants.APIURLS.pokemonAPI}type/${this.selectedType}/`;
    this.pokeService.getTypeDetails(url).subscribe(
      response => {
        this.typeDetails = response;
        const existingTypes: Array<any> = JSON.parse(localStorage.getItem(AppConstants.typeDetailsArray));
        if(!existingTypes) {
          localStorage.setItem(AppConstants.typeDetailsArray, JSON.stringify([response]))
        } else {
          existingTypes.push(response)
          localStorage.setItem(AppConstants.typeDetailsArray, JSON.stringify(existingTypes));
        }
      },
      console.log
    );
  }

}
