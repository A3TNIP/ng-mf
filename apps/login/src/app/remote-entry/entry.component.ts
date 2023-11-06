import {Component, inject, OnInit} from '@angular/core';
import {ActionDispatcher, setLoader, UserService} from "@ng-mf/data-access-user";

@Component({
  selector: 'ng-mf-login-entry',
  template: `<div class="login-app">
    <form class="login-form" (ngSubmit)="login()">
      <label>
        Username:
        <input type="text" name="username" [(ngModel)]="username" />
      </label>
      <label>
        Password:
        <input type="password" name="password" [(ngModel)]="password" />
      </label>
      <button type="submit">Login</button>
    </form>
    <div *ngIf="isLoggedIn$ | async">User is logged in!</div>
  </div>`,
  styles:[
    `
      .login-app {
        width: 30vw;
        border: 2px dashed black;
        padding: 8px;
        margin: 0 auto;
      }
      .login-form {
        display: flex;
        align-items: center;
        flex-direction: column;
        margin: 0 auto;
        padding: 8px;
      }
      label {
        display: block;
      }
    `,
  ]
})
export class RemoteEntryComponent implements OnInit{
  username = '';
  password = '';
  isLoggedIn$ = this.userService.isUserLoggedIn$;
  constructor(private userService: UserService) {}
  login() {
    this.userService.checkCredentials(this.username, this.password);
  }
  actionDispatcher: ActionDispatcher = inject(ActionDispatcher);

  ngOnInit() {
    console.log("Logs to check")
    this.actionDispatcher.dispatch(setLoader({ message: 'Loader Works!' }));
  }
}
