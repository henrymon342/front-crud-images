import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Pastor } from '../../../models/pastor';
import { PastorService } from '../services/pastor.service';
import Swal from 'sweetalert2';
import { ImageService } from '../../../services/image.service';
import { AsignaturaService } from '../services/asignatura.service';
import { Asignatura } from '../../../models/asignatura';

@Component({
  selector: 'app-list-pastor-distrital',
  templateUrl: './list-pastor-distrital.component.html',
  styleUrls: ['./list-pastor-distrital.component.scss']
})
export class ListPastorDistritalComponent implements OnInit {

  displayedColumns: string[] = [ 'Nro', 'name', 'category', 'area', 'year', 'membresia', 'lugardeministerio', 'mas'];

  public dataSource = new MatTableDataSource<Pastor>();
  listAsignaturas: Asignatura[] = [];

  constructor( private _servicePastor: PastorService,
               private toastr: ToastrService,
               private _serviceImage: ImageService,
               private _serviceAsignatura: AsignaturaService) { }

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
    .subscribe( async res => {
      console.log(await res);
      this.dataSource.data = this.dataSource.data.filter((item: Pastor) => item.id!=id);
    })
    this.deleteImage( id);
    this._serviceAsignatura.getByIdPastor(id)
    .subscribe(res => {
      console.log(res);
      this.listAsignaturas = res as Asignatura[];
      this.listAsignaturas.forEach( (asig: Asignatura) => {
        this._serviceAsignatura.delete(asig.id).subscribe( async res => {
          console.log( await res);
        })
      });
    })


    this.toastr.success('Satisfactoriamente!', 'Pastor eliminado');
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

