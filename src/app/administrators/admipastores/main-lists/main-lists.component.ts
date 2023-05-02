import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../../administrator/admiusuarios/services/dialog.service';
import { CreatePastorComponent } from '../create-pastor/create-pastor.component';
import { ChangeService } from '../../../services/change.service';

@Component({
  selector: 'app-main-lists',
  templateUrl: './main-lists.component.html',
  styleUrls: ['./main-lists.component.scss']
})
export class MainListsComponent implements OnInit {

  @HostBinding('class.is-open')
  isChange = false;

  dialogRef: any;
  stateDialog: boolean = false;
  constructor( public dialog: MatDialog,
               private _changeService: ChangeService) { }

  ngOnInit(): void {
    this._changeService.change.subscribe(isChange => {
      this.dialogRef.close();
      this.isChange = isChange;
    });
  }

  changeState() {
    this.isChange = this.isChange?false:true;
    this._changeService.toggle();
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
