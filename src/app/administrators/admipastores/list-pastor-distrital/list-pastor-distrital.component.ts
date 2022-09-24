import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Pastor } from '../../../models/pastor';
import { PastorService } from '../services/pastor.service';

@Component({
  selector: 'app-list-pastor-distrital',
  templateUrl: './list-pastor-distrital.component.html',
  styleUrls: ['./list-pastor-distrital.component.scss']
})
export class ListPastorDistritalComponent implements OnInit {

  displayedColumns: string[] = [ 'Nro', 'name', 'category', 'area', 'year', 'membresia', 'lugardeministerio', 'mas'];

  public dataSource = new MatTableDataSource<Pastor>();

  constructor( private _servicePastor: PastorService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDistritalPastors();
  }

  getDistritalPastors() {
    const category = { category: "DISTRITAL"}
    this._servicePastor.getPastorByCategory(category)
    .subscribe(res => {
      console.log(res);
      this.dataSource.data = res as Pastor[];
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletePastor(id: number){
    this._servicePastor.delete(id)
    .subscribe(res => {
      console.log(res);
      this.dataSource.data = this.dataSource.data.filter((item: Pastor) => item.id!=id);
      this.toastr.success('Satisfactoriamente!', 'Pastor eliminado');
    })
  }

}

