import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolver/lists.resolver';
import { MessageResolver } from './_resolver/messages.resolver';

export const appRoutes: Routes = [
{ path: '', component: HomeComponent },
{
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
        { path: 'members', component: MemberListComponent, canActivate: [AuthGuard], resolve: { users: MemberListResolver} },
        { path: 'members/:id', component: MemberDetailComponent, canActivate: [AuthGuard], resolve: { user: MemberDetailResolver} },
        { path: 'member/edit', component: MemberEditComponent,
         resolve: { user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
        { path: 'messages', component: MessagesComponent, resolve: { messages: MessageResolver}  },
        { path: 'lists', component: ListsComponent, resolve: { users: ListsResolver} },
    ]
},

{ path: '**', redirectTo: '', pathMatch: 'full'}
];
