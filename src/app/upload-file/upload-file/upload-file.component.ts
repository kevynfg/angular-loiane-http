import { environment } from 'src/environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  @Input() inputFile: Set<File>;
  progress = 0;

  constructor(private fileService: UploadService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    const selectedFiles = event.srcElement.files as FileList;

    // document.getElementById('customFileLabel').innerHTML =
    //   selectedFiles[0].name;

    const fileNames = [];
    this.inputFile = new Set();

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.inputFile.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');

    this.progress = 0;
  }

  onUpload() {
    if (this.inputFile && this.inputFile.size > 0) {
      this.fileService
        .upload(this.inputFile, environment.BASE_URL + '/upload')
        .subscribe((event: HttpEvent<object>) => {
          // HttpEventType;
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log('Upload Concluído.');
          } else if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((event.loaded * 100) / event.total);
            console.log('Progresso: ', percentDone);
            this.progress = percentDone;
          }
        });
    }
  }

  ngOnDestroy() {}
}
