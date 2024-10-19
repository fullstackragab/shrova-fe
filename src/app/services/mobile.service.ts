import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
  mobile = new BehaviorSubject<boolean>(false);

  constructor() {}
}
