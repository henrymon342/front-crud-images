import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Iglesia } from '../../../../models/iglesia';

@Component({
  selector: 'app-admi-iglesia-list',
  templateUrl: './admi-iglesia-list.component.html',
  styleUrls: ['./admi-iglesia-list.component.scss']
})
export class AdmiIglesiaListComponent implements OnInit {

  displayedColumns: string[] = [ 'Nro', 'nombre', 'pastor', 'fundación', 'zona', 'more'];

  public dataSource = new MatTableDataSource<Iglesia>();

  constructor() { }

  ngOnInit(): void {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
