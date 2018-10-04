import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { Photo } from '../../_models/Photo';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }

    };


    /* FIX- Failed to load http://localhost:5000/api/users/1/photos:
     Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Origin'
     header in the response must not be the wildcard '*' when the request's credentials mode is 'include'. Origin
     'http://localhost:4200' is therefore not allowed access. The credentials mode of requests initiated by the XMLHttpRequest
      is controlled by the withCredentials attribute.*/
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
  }

}
