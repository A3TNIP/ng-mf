import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {Action} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class ActionDispatcher {
  private actionSubject: Subject<Action> = new Subject<Action>();

  public dispatch(action: Action): void {
    this.actionSubject.next(action);
  }

  public getCurrentAction(): Observable<Action> {
    return this.actionSubject.asObservable();
  }
}
