import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class MessageResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService,
         private authService: AuthService) {}
    resolve(): Observable<Message[]> {
        return this.userService.getMessages(this.authService.user.id, this.pageNumber, this.pageSize, this.messageContainer)
        .pipe(catchError(error => {
            this.alertify.error('Error getting messages !');
            this.router.navigate(['/home']);
            return of(null);
        }));
    }
}
