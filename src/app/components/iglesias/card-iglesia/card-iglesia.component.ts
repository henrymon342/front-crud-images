import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { Pastor } from '../../../models/pastor';
import { PastorService } from '../../../administrators/admipastores/services/pastor.service';
import { ImageService } from '../../../services/image.service';
import { firstValueFrom } from 'rxjs';
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

  public imgChurch: Image = new Image();
  public imgPastor: Image = new Image();

  public pastor: Pastor = new Pastor();
  constructor( private _pastorService: PastorService,
               private _imgService: ImageService,
               public dialog: MatDialog ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChange) {
    const idpas = changes['idPastor'];
    const idchur = changes['idchurch'];
    this.getPastor(idpas['currentValue']);
    this.getImagePastor(idpas['currentValue']);
    this.getImageChurch(idchur['currentValue']);
  }

  getPastor( idpas: number ): void{
    this._pastorService.get(idpas).subscribe( async res =>{
      this.pastor = await res as Pastor;
    });
  }

  async getImageChurch (id:number){
    await firstValueFrom(this._imgService.get( id ))
    .then((value) => {
      this.imgChurch = value;
      console.log(value);
    })
    .catch((err)=>{
      console.log('ERROR AL OBTENER IMAGEN DE IGLESIA');
      console.log(err);
    });
  }

  async getImagePastor (id:number){
    await firstValueFrom(this._imgService.get( id ))
    .then((value) => {
      this.imgPastor = value;
      console.log(value);
    })
    .catch((err)=>{
      console.log('ERROR AL OBTENER IMAGEN DE PASTOR');
      console.log(err);
    });
  }

  seeMore():void {
    let iglesia = new Iglesia();
    iglesia.id = this.idchurch;
    // iglesia.nombre = this.church;
    // iglesia.zona = this.zona;
    // iglesia.idPastor = this.idPastor;
    // iglesia.diacentral = this.diacentral;
    // iglesia.horacentralini = this.horacentralini;
    // iglesia.horacentralfin = this.horacentralfin;
    // iglesia.diajni = this.diajni;
    // iglesia.horajniini = this.horajniini;
    // iglesia.horajnifin = this.horajnifin;
    iglesia.imagePath = this.imgChurch.imagePath;
    iglesia.pastorname = this.pastor.name;
    iglesia.imagePathPas = this.imgPastor.imagePath;

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
