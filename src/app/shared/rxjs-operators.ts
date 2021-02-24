import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Event } from '@angular/router';
import { pipe, Observable } from 'rxjs';
import { filter, map, pluck, tap } from 'rxjs/operators';

// tslint:disable-next-line: typedef
export function filterResponse<T>() {
  return pipe(
    filter((event: any) => event.type === HttpEventType.Response),
    map((res: HttpResponse<T>) => res.body)
  );
}

export function uploadProgress<T>(callback: (progress: number) => void) {
  return tap((event: HttpEvent<T>) => {
    if (event.type === HttpEventType.UploadProgress) {
      callback(Math.round((event.loaded * 100) / event.total));
    }
  });
}
