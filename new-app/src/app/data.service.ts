import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from './model/model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPokemon(): Observable<Pokemon[]> {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/?limit=811').pipe(map(response  => {
      return response.results as Pokemon[];
    }))
  }
}
