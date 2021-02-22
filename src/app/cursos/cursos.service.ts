import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Curso } from './curso';
import { Observable } from 'rxjs';
import { tap, map, switchMap, delay, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) {}

  list(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.API).pipe(delay(2000), tap(console.log));
  }

  // tslint:disable-next-line: typedef
  create(curso: object) {
    return this.http.post(this.API, curso).pipe(take(1));
  }

  // tslint:disable-next-line: typedef
  loadById(id: number) {
    return this.http.get(`${this.API}/${id}`).pipe(take(1));
  }
}
