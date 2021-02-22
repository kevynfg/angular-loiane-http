import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import {HttpClient} from '@angular/common/http';

import { Curso } from './curso';
import { Observable } from 'rxjs';
import {tap, map, switchMap, delay} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.API)
    .pipe(
      delay(2000),
      tap(console.log)
    );
  }
}
