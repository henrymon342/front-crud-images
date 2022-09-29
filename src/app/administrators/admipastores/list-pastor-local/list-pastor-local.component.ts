import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Pastor } from '../../../models/pastor';
import { PastorService } from '../services/pastor.service';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-list-pastor-local',
  templateUrl: './list-pastor-local.component.html',
  styleUrls: ['./list-pastor-local.component.scss']
})
export class ListPastorLocalComponent implements OnInit {

  displayedColumns: string[] = [ 'Nro', 'name', 'category', 'area', 'year', 'membresia', 'lugardeministerio', 'mas'];

  public dataSource = new MatTableDataSource<Pastor>();

  constructor( private _servicePastor: PastorService, private toastr: ToastrService,
               private _serviceImage: ImageService) { }

  ngOnInit(): void {
    this.getDistritalPastors();
  }

  getDistritalPastors() {
    const category = { category: "LOCAL"}
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
    .subscribe( res => {
      console.log(res);
      this.dataSource.data = this.dataSource.data.filter((item: Pastor) => item.id!=id);
      this.toastr.success('Satisfactoriamente!', 'Pastor eliminado');
       this.deleteImage( id);
    })
  }

  deleteImage(id: number){
    this._serviceImage.delete(id).subscribe( res => {
      console.log(res);
    })
  }

  popUpDeletePastor(id: number){
    Swal.fire({
      title: 'Esta seguro de eliminar pastor?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deletePastor(id);

      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

}
