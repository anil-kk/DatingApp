import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';


@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}
    resolve(): Observable<User[]> {
        return this.userService.getUsers()
        .pipe(catchError(error => {
            this.alertify.error('Error getting Users details!');
            this.router.navigate(['/home']);
            return of(null);
        }));
    }
}
