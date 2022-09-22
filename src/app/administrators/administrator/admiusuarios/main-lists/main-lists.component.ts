import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'app-main-lists',
  templateUrl: './main-lists.component.html',
  styleUrls: ['./main-lists.component.scss']
})
export class MainListsComponent implements OnInit {

  stateDialog: boolean = false;
  dialogRef: any;
  constructor( public dialog: MatDialog,
               private _serviceDialog: DialogService,) { }

  ngOnInit(): void {
    this._serviceDialog.closeDialogEmitter.subscribe(
      data => {
        this.stateDialog = data;
        console.log(this.stateDialog);
        this.dialogRef.close();
      }
    );
  }

  openDialog() {
    this.dialogRef = this.dialog.open(CreateUserComponent, {
                          width: '80vw',
                          height: '95vh',
                          panelClass: "dialog"
                          });

    this.dialogRef.afterClosed().subscribe((result:any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
