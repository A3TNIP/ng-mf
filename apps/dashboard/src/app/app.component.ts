import {Component, OnInit} from '@angular/core';
import {ActionDispatcher, setLoader, UserService} from "@ng-mf/data-access-user";
import {Router} from "@angular/router";
import {distinctUntilChanged, map, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {loaderSelector} from "./loader/store/loader.selectors";
import {AppStateInterface} from "./loader/state/app.state.interface";
import {ofType} from "@ngrx/effects";

@Component({
  selector: 'ng-mf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoggedIn$ = this.userService.isUserLoggedIn$;
  isLoading$: Observable<boolean>;
  loadingMessage$: Observable<string>;
  constructor(private userService: UserService, private router: Router,
              private actionDispatcher: ActionDispatcher,
              private store: Store<AppStateInterface>

  ) {
    this.isLoading$ = this.store.select(loaderSelector).pipe(map(x => x.isLoading));
    this.loadingMessage$ = this.store.select(loaderSelector).pipe(map(x => x.message));
  }
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
    this.actionDispatcher.getCurrentAction()
      .pipe(
        ofType(setLoader),
      )
      .subscribe({
        next: (action) => {
          console.log("Action dispatched", action.type)
          this.store.dispatch(action);
        },
      })
  }
}
