import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly API = `${environment.API}`;
  constructor(private http: HttpClient) {}

  upload(files: Set<File>, url: string) {
    const formData = new FormData();
    files.forEach((file) => formData.append('file', file, file.name));

    // const request = new HttpRequest('POST', url, formData);
    // return this.http.request(request);

    return this.http.post(url, formData, {
      observe: 'events',
      reportProgress: true,
    });
  }

  download(url: string) {
    return this.http.get(url, {
      responseType: 'blob' as 'json',
      // reportProgress
      // content-length -> precisa ser setado pelo back-end
    });
  }

  handleFile(res: any, filename: string) {
    const file = new Blob([res], {
      type: res.type,
    });

    // Internet Explorer
    // faz o prompt para salvar ou abrir o arquivo, verifica se é Internet Explorer
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file);
      return;
    }

    const blob = window.URL.createObjectURL(file);

    // gambiarra para criar um link para setar o HREF nesse link
    // e o usuário vai clicar neste link sem saber, para download
    const link = document.createElement('a');
    link.href = blob;
    link.download = filename;

    // Chrome
    // link.click();

    // Click adaptado pra Firefox
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    // Timeout necessário para funcionar o revoke no Firefox
    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      link.remove();
    }, 100);
  }
}
