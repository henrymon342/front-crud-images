import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ChangeService {

  isChange = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    console.log(this.isChange);
    this.isChange = !this.isChange;
    this.change.emit(this.isChange);
  }

}
