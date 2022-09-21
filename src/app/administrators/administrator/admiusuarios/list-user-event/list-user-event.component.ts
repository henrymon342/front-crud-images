import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { User } from "../../../../models/user";
import { UserService } from '../../services/user.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { DialogService } from '../services/dialog.service';
@Component({
  selector: 'app-list-user-event',
  templateUrl: './list-user-event.component.html',
  styleUrls: ['./list-user-event.component.scss']
})
export class ListUserEventComponent implements OnInit {
  displayedColumns: string[] = [ 'Nro', 'nombre', 'apellido', 'cargo', 'ministerio', 'tipo', 'mas'];

  public dataSource = new MatTableDataSource<User>();

  stateDialog: boolean = false;
  dialogRef: any;
  constructor( public dialog: MatDialog, private _serviceDialog: DialogService, private _serviceUser: UserService ) { }

  ngOnInit(): void {
    this._serviceDialog.closeDialogEmitter.subscribe(
      data => {
        this.stateDialog = data;
        console.log(this.stateDialog);
        this.dialogRef.close();
      }
    );
    this.getUsersEvent();
  }

  getUsersEvent() {
    const tipo = { type: 'Actividades'}
    this._serviceUser.getUserByType(tipo)
    .subscribe(res => {
      console.log(res);
      this.dataSource.data = res as User[];

    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

