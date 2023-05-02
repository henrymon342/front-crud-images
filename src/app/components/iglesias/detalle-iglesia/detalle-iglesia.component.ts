import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Iglesia } from '../../../models/iglesia';
import { IglesiaService } from '../../../administrators/administrator/admiiglesias/services/iglesia.service';

@Component({
  selector: 'app-detalle-iglesia',
  templateUrl: './detalle-iglesia.component.html',
  styleUrls: ['./detalle-iglesia.component.scss']
})
export class DetalleIglesiaComponent implements OnInit {

  public iglesia: Iglesia = new Iglesia();
  public pastorname: string = '';
  public imagePathPas: string = '';
  public imagePath: string = '';


  constructor( public dialogRef: MatDialogRef<any>,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private _churchService: IglesiaService) {
    this.pastorname = data.pastorname;
    this.imagePath = data.imagePath;
    this.imagePathPas = data.imagePathPas;
    this.iglesia = data;
    console.log(data);
  }

  ngOnInit(): void {
    console.log(this.data);
    this.getChurch(this.data.id);

  }

  getChurch(idChurch: number): void{
    this._churchService.get(idChurch).subscribe( res =>{
      this.iglesia = res as Iglesia;
      console.log(this.iglesia);
    });
  }

}
