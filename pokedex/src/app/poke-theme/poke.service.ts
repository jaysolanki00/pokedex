import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokeList, Pokemon, PokeTypeResponse } from '../shared/Models/PokeTypes';
import { ServiceConfig } from '../shared/httpservice/service-config';
import { map } from 'rxjs/operators';
import { AppConstants } from '../shared/constants/app-constants';


@Injectable({
  providedIn: 'root'
})
export class PokeService {

  public pokeMasterData: Array<Pokemon>;
  public pokeMiniMasterList: PokeList;

  constructor(private http: HttpClient) { }

  getPokeList(): Observable<PokeList> {
    return this.http.get(ServiceConfig.generatePokeAPIURL()).pipe(map((pokeList: PokeList) => {
      this.pokeMiniMasterList = pokeList;
      return pokeList;
  })) as Observable<PokeList>;
  }

  getNextPokeList(nextURL): Observable<PokeList> {
    return this.http.get(nextURL) as Observable<PokeList>;
  }

  getPokeDetails(url: string): Observable<Pokemon> {
    return this.http.get(url) as Observable<Pokemon>;
  }

  getPokeTypesList() : Observable<PokeList> {
    return this.http.get(AppConstants.APIURLS.pokeTypeUrl) as Observable<PokeList>;
  }

  getPokemonByType(nextURL): Observable<PokeTypeResponse> {
    return this.http.get(nextURL) as Observable<PokeTypeResponse>;
  }

}
