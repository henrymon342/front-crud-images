import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-user-pastor',
  templateUrl: './list-user-pastor.component.html',
  styleUrls: ['./list-user-pastor.component.scss']
})
export class ListUserPastorComponent implements OnInit {

  displayedColumns: string[] = [ 'Nro', 'nombre', 'apellido', 'cargo', 'ministerio', 'tipo', 'mas'];

  public dataSource = new MatTableDataSource<User>();

  constructor( private _serviceUser: UserService ) { }

  ngOnInit(): void {
    this.getUsersEvent();
  }

  getUsersEvent() {
    const tipo = { type: 'PASTORES'}
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

}
