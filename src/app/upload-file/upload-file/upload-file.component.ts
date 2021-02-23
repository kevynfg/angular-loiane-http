import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onChange(event: any) {
    const selectedFiles = event.srcElement.files as FileList;

    document.getElementById('customFileLabel').innerHTML =
      selectedFiles[0].name;

    const fileNames = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');
  }
}
