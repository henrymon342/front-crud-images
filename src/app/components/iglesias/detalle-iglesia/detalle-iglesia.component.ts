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
  }

  ngOnInit(): void {
    this.getChurch(this.data.id);
  }

  getChurch(idChurch: number): void{
    this._churchService.get(idChurch).subscribe( res =>{
      this.iglesia = res as Iglesia;
    });
  }

  calcAnios(fundation: string){
    console.log(fundation);
    let now = new Date();
    let date = new Date(fundation);

    const diffInDays = Math.floor((Number(now) - Number(date)) / (1000 * 60 * 60 * 24));
    console.log(diffInDays);
    return Math.floor(diffInDays/365)+1;
  }
}

