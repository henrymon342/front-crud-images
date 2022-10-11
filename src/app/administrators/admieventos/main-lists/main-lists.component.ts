import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../administrator/admiusuarios/services/dialog.service';
import { CreateEventComponent } from '../create-event/create-event.component';

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
  }

  openDialog() {
    this.dialogRef = this.dialog.open(CreateEventComponent, {
                          width: '80vw',
                          height: '95vh',
                          panelClass: "dialog"
                          });

    this.dialogRef.afterClosed().subscribe((result:any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
