import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../administrator/admiusuarios/services/dialog.service';
import { CreatePastorComponent } from '../create-pastor/create-pastor.component';

@Component({
  selector: 'app-main-lists',
  templateUrl: './main-lists.component.html',
  styleUrls: ['./main-lists.component.scss']
})
export class MainListsComponent implements OnInit {

  dialogRef: any;
  stateDialog: boolean = false;
  constructor( public dialog: MatDialog,
               private _serviceDialog: DialogService) { }

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
    this.dialogRef = this.dialog.open(CreatePastorComponent, {
                          width: '80vw',
                          height: '95vh',
                          panelClass: "dialog"
                          });

    this.dialogRef.afterClosed().subscribe((result:any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
