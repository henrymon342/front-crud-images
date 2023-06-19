import { Component, OnInit, Input, SimpleChange, ViewChild, ElementRef } from '@angular/core';
import { Pastor } from '../../../models/pastor';
import { PastorService } from '../../../administrators/admipastores/services/pastor.service';
import { ImageService } from '../../../services/image.service';
import { combineLatest, firstValueFrom } from 'rxjs';
import { Image } from '../../../models/image';
import { Iglesia } from '../../../models/iglesia';
import { MatDialog } from '@angular/material/dialog';
import { DetalleIglesiaComponent } from '../detalle-iglesia/detalle-iglesia.component';

@Component({
  selector: 'card-iglesia',
  templateUrl: './card-iglesia.component.html',
  styleUrls: ['./card-iglesia.component.scss']
})
export class CardIglesiaComponent implements OnInit {

  @Input() idchurch: number;
  @Input() church: string;
  @Input() zona: string;
  @Input() idPastor: number;
  @Input() diacentral: string;
  @Input() horacentralini: string;
  @Input() horacentralfin: string;
  @Input() diajni: string;
  @Input() horajniini: string;
  @Input() horajnifin: string;
  @Input() nombrepastor: string;
  @Input() imgpathpas: string;
  @Input() imgpathchurch: string;

  public cargando:string = 'en espera...';



  constructor(
               public dialog: MatDialog ) {}

  ngOnInit(): void {}


  seeMore():void {
    let iglesia = new Iglesia();
    iglesia.id = this.idchurch;
    iglesia.imagePath = this.imgpathchurch;
    iglesia.pastorname = this.nombrepastor;
    iglesia.imagePathPas = this.imgpathpas;

    this.openDialog('3000ms', '1500ms', iglesia)
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, iglesia: Iglesia): void {
    const parametros = {
      width: '90vw',
      enterAnimationDuration,
      exitAnimationDuration,
      data: iglesia,
      panelClass: 'dialog',
      maxHeight: '90vh'
    };
    this.dialog.open(DetalleIglesiaComponent, parametros );
  }
}









