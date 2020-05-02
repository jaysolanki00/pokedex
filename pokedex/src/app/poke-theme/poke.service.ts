import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokeList, Pokemon } from '../shared/Models/PokeTypes';
import { ServiceConfig } from '../shared/httpservice/service-config';
import { map } from 'rxjs/operators';


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

}
