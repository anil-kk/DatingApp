import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { Photo } from '../../_models/Photo';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';


@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  currentMainPhoto: Photo;

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

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

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe( () => {
      this.alertify.success('Main photo Updated!');
      this.currentMainPhoto = this.photos.filter( p => p.isMain === true)[0];
      this.currentMainPhoto.isMain = false;
      photo.isMain = true;
      this.authService.changeUserPhoto(photo.url);
      this.authService.user.photoURL = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.user));
    }, () => {
      this.alertify.error('Error updating main photo, try again later!');
    });
  }

  deletePhoto(photo: Photo) {
    this.userService.deletePhoto(this.authService.decodedToken.nameid, photo.id).subscribe( () => {
        this.photos = this.photos.filter( p => p.id !== photo.id);
    });
  }

}
