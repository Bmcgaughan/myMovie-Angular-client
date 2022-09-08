import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  mystatusChanged: EventEmitter<any> = new EventEmitter();
  mystatus: any;

  constructor() {}

  get data(): any {
    return this.mystatus;
  }

  set data(val: any) {
    this.mystatus = val;
    this.mystatusChanged.emit(val);
  }
}
