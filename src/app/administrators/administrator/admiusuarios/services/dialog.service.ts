import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  closeDialog: boolean = false;
  @Output()
  closeDialogEmitter = new EventEmitter<boolean>();

  constructor() { }

  setPersona(state: boolean) {
    this.closeDialog = state;
    console.log(this.closeDialog);

    this.cambiosEstado();
  }

  // Emitimos los cambio de this.persona.
  cambiosEstado() {
    this.closeDialogEmitter.emit(this.closeDialog);
  }
}
