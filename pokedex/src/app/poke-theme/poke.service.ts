import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokeList, Pokemon } from '../shared/Models/PokeTypes';
import { ServiceConfig } from '../shared/httpservice/service-config';


@Injectable({
  providedIn: 'root'
})
export class PokeService {

  constructor(private http: HttpClient) { }

  getPokeList(): Observable<PokeList> {
    return this.http.get(ServiceConfig.generatePokeAPIURL()) as Observable<PokeList>;
  }

  getPokeDetails(url: string): Observable<Pokemon> {
    return this.http.get(url) as Observable<Pokemon>;
  }

}
