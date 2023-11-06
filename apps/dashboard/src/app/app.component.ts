import {Component, OnInit} from '@angular/core';
import {UserService} from "@ng-mf/data-access-user";
import {Router} from "@angular/router";
import {distinctUntilChanged} from "rxjs";

@Component({
  selector: 'ng-mf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn$ = this.userService.isUserLoggedIn$;
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.isLoggedIn$
      .pipe(distinctUntilChanged())
      .subscribe(async (loggedIn) => {
        // Queue the navigation after initialNavigation blocking is completed
        setTimeout(() => {
          if (!loggedIn) {
            this.router.navigateByUrl('login');
          } else {
            this.router.navigateByUrl('');
          }
        });
      });
  }
}
