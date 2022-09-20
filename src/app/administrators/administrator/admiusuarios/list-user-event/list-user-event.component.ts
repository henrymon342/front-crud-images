import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from "../../../../models/user";
@Component({
  selector: 'app-list-user-event',
  templateUrl: './list-user-event.component.html',
  styleUrls: ['./list-user-event.component.scss']
})
export class ListUserEventComponent implements OnInit {
  displayedColumns: string[] = [ 'Nro', 'nombre', 'apellido', 'cargo', 'ministerio', 'tipo', 'mas'];

  public dataSource = new MatTableDataSource<User>();

  constructor() { }

  ngOnInit(): void {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

