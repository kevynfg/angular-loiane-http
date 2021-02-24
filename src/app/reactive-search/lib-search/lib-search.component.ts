import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss'],
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any>;
  total: number;
  FIELDS = 'name,description,version,homepage';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Filtro para pesquisa
    this.results$ = this.queryField.valueChanges.pipe(
      map((value) => value.trim()),
      filter((value) => value.length > 1),
      debounceTime(500),
      distinctUntilChanged(),
      // tap((value) => console.log(value))
      switchMap((value) =>
        this.http.get(this.SEARCH_URL, {
          params: {
            // value -> valor filtrado da query acima
            search: value,
            fields: this.FIELDS,
          },
        })
      ),
      tap((response: any) => (this.total = response.total)),
      map((res: any) => res.results)
    );
  }

  onSearch() {
    const fields = 'name,description,version,homepage';
    let value = this.queryField.value;
    // tslint:disable-next-line: no-conditional-assignment
    if (value && (value = value.trim()) !== '') {
      value = value.trim();

      const params_ = {
        search: value,
        fields,
      };

      // Trata parâmetros de forma dinâmica
      // vai colocar ? e & caso tenha nos valores passados para o parâmetro
      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', fields);

      this.results$ = this.http
        .get(this.SEARCH_URL, {
          params,
        })
        .pipe(
          tap((res: any) => (this.total = res.total)),
          map((res: any) => res.results)
        );
    }
  }
}
