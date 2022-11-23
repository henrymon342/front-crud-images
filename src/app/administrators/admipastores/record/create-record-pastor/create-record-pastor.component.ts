import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignaturaService } from '../../services/asignatura.service';
import { Asignatura } from '../../../../models/asignatura';
import Swal from 'sweetalert2';
import { Pastor } from '../../../../models/pastor';

@Component({
  selector: 'app-create-record-pastor',
  templateUrl: './create-record-pastor.component.html',
  styleUrls: ['./create-record-pastor.component.scss']
})
export class CreateRecordPastorComponent implements OnInit {

  tip: any;
  pastor:Pastor = new Pastor();

  listaMaterias: Asignatura[] = [];
  public dataSource = new MatTableDataSource<Asignatura>();

  displayedColumns: string[] = ['numero', 'nombre', 'nota', 'estado'];



  constructor(
               private service_asignatura: AsignaturaService,
               private route: ActivatedRoute,
               private router: Router
               ) { }

  ngOnInit(): void {
    const param = this.route.snapshot.params;
    this.pastor.id = param['id'];
    console.log(this.pastor.id);
    this.getAsignaturas();

  }



  public getAsignaturas = () => {
    this.listaMaterias = [
      { numero: 1, nombremateria: 'TEOLOGIA SISTEMÁTICA I', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 2, nombremateria: 'TEOLOGIA SISTEMÁTICA II', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 3, nombremateria: 'TEOLOGIA SISTEMÁTICA III', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 4, nombremateria: 'TEOLOGIA SISTEMÁTICA IV', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 5, nombremateria: 'TEOLOGIA DE_SANTIDAD_I', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 6, nombremateria: 'TEOLOGIA DE_SANTIDAD_II', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 7, nombremateria: 'NUEVO_TESTAMENTO_I', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 8, nombremateria: 'NUEVO_TESTAMENTO_II', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 9, nombremateria: 'ANTIGUO_TESTAMENTO_I', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 10, nombremateria: 'ANTIGUO_TESTAMENTO_II', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 11, nombremateria: 'HISTORIA_ECLESIASTICA_I', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 12, nombremateria: 'HISTORIA_ECLESIASTICA_II', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 13, nombremateria: 'HOMILÉTICA_I', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 14, nombremateria: 'FORMACIÓN_Y_LIDERAZGO_CRISTIANO', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 15, nombremateria: 'EDUCACION_CRISTIANA', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 16, nombremateria: 'HISTORIA_E_IDENTIDAD_IGLESIA_DEL_NAZARENO', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 17, nombremateria: 'BASES_BÍBLICAS_Y_TEOLÓGICAS_DE_LA_FAMILIA', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 18, nombremateria: 'HERMENEUTICA_BIBLICA', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 19, nombremateria: 'BASES_BIBLICAS_Y_TEOLOGICAS_DEL_MINISTERIO', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 20, nombremateria: 'METODOS_EXEGÉTICOS', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 21, nombremateria: 'INTRODUCCIÓN_A_LA_SOCIOLOGIA', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 22, nombremateria: 'ETICA_CRISTIANA', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 23, nombremateria: 'EPISTOLAS_PASTORALES', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 24, nombremateria: 'MOVIMIENTOS_Y_CORRIENTES_TEOLÓGICAS_CONTEMPORANEAS', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 25, nombremateria: 'ADMINTRACIÓN_Y_GESTIÓN_DE_LOS_RECURSOS_ECLESIASTICOS', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 26, nombremateria: 'CUIDADO_Y_ASESORAMIENTO_PASTORAL', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 27, nombremateria: 'BASES_BÍBLICAS_Y_WESLEYANAS_DE_LA_ADORACIÓN', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 28, nombremateria: 'EVANGELISMO_Y_DESARROLLO_INTEGRAL', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 29, nombremateria: 'LA_IGLESIA_EN_MISIÓN', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
      { numero: 30, nombremateria: 'ORGANIZACIÓN_Y_POLÍTICA_IGLESIA_DEL_NAZA', nota: ' ', estado: false, idFKPastor: this.pastor.id!},
    ]
  }



  changeNota(element: Asignatura, nuevanota: string ){
    this.listaMaterias.forEach(item => {
      if(item.numero == element.numero){
        item.nota = nuevanota;
        if( Number(item.nota) > 60 ){
          item.estado = true;
        }else{
          item.estado = false;
        }
      }
    });
    console.log(this.listaMaterias);
    this.promedio();
    this.materiasAprobadas();
  }

  changeEstado( event: any, element: Asignatura){
    console.log('nuevo estado', event.source.checked);

    this.listaMaterias.forEach(item => {
      if(item.numero == element.numero){
        item.estado = Boolean(event.source.checked);
      }
    });
    console.log(this.listaMaterias);
    this.promedio();
    this.materiasAprobadas();
  }

  alertaCrear(){
    console.log('creando...');

    Swal.fire({
      title: 'esta seguro de asociar record?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.crearAsignatura();
        Swal.fire('Se ha asociado!', '', 'success')

      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })


  }

  crearAsignatura(){
    this.listaMaterias.forEach(materia => {
      let nuevamat = {numero: materia.numero, nombremateria: materia.nombremateria, nota: materia.nota, estado: materia.estado, idFKPastor: materia.idFKPastor}
      this.service_asignatura.create(nuevamat).subscribe(async (res:any)  =>{
        console.log( await res);
      })
    });

    this.router.navigate(['auth/admipastores/pastor-update', this.pastor.id]);
  }

  // ngOnDestroy(){
  //   alert('esta intentando salir')
  // }

  promedio(){
    let sumanotas = 0;
    this.listaMaterias.forEach(element => {
      if( element.estado ){
        sumanotas = sumanotas + Number(element.nota);
      }
    });
    return sumanotas==0 ?0:sumanotas/this.materiasAprobadas();
  }


  materiasAprobadas(){
    let cont = 0;
    this.listaMaterias.forEach(element => {
      cont = element.estado? cont+1: cont;
    });
    return cont;
  }

}
