import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/User';
import { AlertifyService } from '../../_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})

export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private activatedRoute: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe( data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.alertify.success('Edit success!');
    this.editForm.reset(this.user);
  }

}
