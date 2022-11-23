import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { EventModel } from '../../../models/event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-list-event-jni',
  templateUrl: './list-event-jni.component.html',
  styleUrls: ['./list-event-jni.component.scss']
})
export class ListEventJniComponent implements OnInit {

  displayedColumns: string[] = [ 'Nro', 'titulo', 'modalidad', 'fecha', 'hora', 'mas'];

  public dataSource = new MatTableDataSource<EventModel>();

  constructor( private _service_event: EventService,
               private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents():void{
    const type_minister = { ministerio: 'JNI'}
    this._service_event.findByMinisterio(type_minister).subscribe( res => {
      console.log(res);
      this.dataSource.data = res as EventModel[];
      this.dataSource.data.forEach(evento => {
        if ( !evento.fechasingle ){
          evento.fechasingle = evento.fechaini;
        }
      });
    })
  }

  applyFilter(event: Event):void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteEvent(id: number):void{
    Swal.fire({
      title: 'Esta seguro?',
      text: "Esto eliminará el evento!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'El evento ha sido eliminado.',
          'success'
        )
        this._service_event.delete(id).subscribe(res=>{
          console.log(res);
          this.dataSource.data = this.dataSource.data.filter((item: EventModel) => item.id!=id);
          this.toastr.success( 'Satisfactoriamente!', 'Evento eliminado' );
        })
      }
    })

  }
}
