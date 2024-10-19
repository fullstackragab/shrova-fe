import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  opened = new BehaviorSubject<boolean>(false);
  open() {
    this.opened.next(true);
  }
  close() {
    this.opened.next(false);
  }
  toggle() {
    if (this.opened.getValue()) this.close();
    else this.open();
  }
}
