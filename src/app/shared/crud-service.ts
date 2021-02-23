import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, take, tap } from 'rxjs/operators';

export class CrudService<T> {
  constructor(protected http: HttpClient, private API_URL: any) {}

  list(): Observable<T[]> {
    return this.http.get<T[]>(this.API_URL).pipe(delay(2000), tap(console.log));
  }

  // tslint:disable-next-line: typedef
  private create(record: any) {
    return this.http.post(this.API_URL, record).pipe(take(1));
  }

  // tslint:disable-next-line: typedef
  loadById(id: T) {
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
  }

  private update(record: any) {
    return this.http.put(`${this.API_URL}/${record.id}`, record).pipe(take(1));
  }

  save(record: any) {
    if (record.id) {
      return this.update(record);
    }
    return this.create(record);
  }

  remove(id: any) {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }
}
