import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/Pagination';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private authService: AuthService, private userService: UserService,
    private activatedRoute: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe( data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.user.id, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
    .subscribe( (res: PaginatedResult<Message[]>) => {
      this.messages = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
   }

   deleteMessage(id: number) {
    this.alertify.confirm('Do you want to delete this message?', () => {
        this.userService.deleteMessage(id, this.authService.user.id).subscribe(() => {
          this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
          this.alertify.success('Message deleted!');
        }, e => {
          this.alertify.error(e);
        });
    });
   }

   pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
