import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Iglesia } from '../../../models/iglesia';

@Component({
  selector: 'app-admiiglesias',
  templateUrl: './admiiglesias.component.html',
  styleUrls: ['./admiiglesias.component.scss']
})
export class AdmiiglesiasComponent implements OnInit {

  displayedColumns: string[] = [ 'Nro', 'nombre', 'pastor', 'fundación', 'zona', 'more'];

  public dataSource = new MatTableDataSource<Iglesia>();

  constructor( private location: Location ) { }

  ngOnInit(): void {
  }


  back() {
    this.location.back();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
