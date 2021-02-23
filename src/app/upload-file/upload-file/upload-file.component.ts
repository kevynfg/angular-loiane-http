import { Component, Input, OnInit } from '@angular/core';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  @Input() inputFile: Set<File>;

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
  }

  onUpload() {
    if (this.inputFile && this.inputFile.size > 0) {
      this.fileService
        .upload(this.inputFile, 'http://localhost:8000/upload')
        .subscribe((response) => console.log('Upload Concluído.'));
    }
  }

  ngOnDestroy() {}
}
