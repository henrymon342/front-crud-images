
import { Component, OnInit } from '@angular/core';
import { Iglesia } from '../../../models/iglesia';
import { IglesiaService } from '../../../administrators/administrator/admiiglesias/services/iglesia.service';

@Component({
  selector: 'app-lista-iglesias',
  templateUrl: './lista-iglesias.component.html',
  styleUrls: ['./lista-iglesias.component.scss']
})
export class ListaIglesiasComponent implements OnInit {


public position:any = 0;
public iglesias = [
    {id: 1234345, nombre: 'LA PORTADA', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', superdni: 'superintendente', presimni: 'presimni', presijni: 'presijni', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm', zona: 'central', imagePath: 'imagePath', pastorname: 'pastorname' },
    {id: 123345, nombre: 'WINCHESTER', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', superdni: 'superintendente', presimni: 'presimni', presijni: 'presijni', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm', zona: 'central', imagePath: 'imagePath', pastorname: 'pastorname' },
    {id: 1234345, nombre: 'MUNAYPATA', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', superdni: 'superintendente', presimni: 'presimni', presijni: 'presijni', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm', zona: 'central', imagePath: 'imagePath', pastorname: 'pastorname' },
    {id: 12345, nombre: 'CENTRAL', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', superdni: 'superintendente', presimni: 'presimni', presijni: 'presijni', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm', zona: 'central', imagePath: 'imagePath', pastorname: 'pastorname' },
    {id: 12343125, nombre: 'MIRAFLORES', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', superdni: 'superintendente', presimni: 'presimni', presijni: 'presijni', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm', zona: 'central', imagePath: 'imagePath', pastorname: 'pastorname' },
    {id: 1246345, nombre: 'VIACHA', idPastor: 125345, ubicacion: 'aca nomas', fundacion:'10/03/1999', superdni: 'superintendente', presimni: 'presimni', presijni: 'presijni', diacentral: 'domingo', horacentralini: '10:00am', horacentralfin: '12:30pm', diajni: 'sabado', horajniini: '16:00pm', horajnifin: '19:00pm', zona: 'central', imagePath: 'imagePath', pastorname: 'pastorname' },
  ];

  private churchs: Iglesia[] = [];
  private copychurchs: Iglesia[] = [];
  public mymodel: string = '';



  public currentChurch: Iglesia = new Iglesia();
  constructor( private _churchService: IglesiaService ) { }

  ngOnInit(): void {
    this.getChurchs();

  }

  getChurchs(): void{
    this._churchService.getAll().subscribe( async (res:any) =>{
      this.churchs = await res;
      this.copychurchs = await res;
      console.log(res);
      this.currentChurch = this.churchs[this.position];

    });
  }

  toDirection(direction: string): void{
    console.log(direction);
    if( direction == 'right' ){
      this.position++;
      if( this.position == this.churchs.length ){
        this.position = 0;
      }
    }
    else{
      this.position--;
      if( this.position < 0 ){
        this.position = this.churchs.length-1;
      }
    }
    this.currentChurch = this.churchs[this.position];
  }

  searchChurch(newValue: any): void {
    console.log(newValue);
    console.log(newValue.length == 0);
    if( newValue != null ){
      this.churchs = this.copychurchs.filter( element => {
        return element.nombre.toLowerCase().includes(newValue);
      });
      if( this.churchs.length != 0 ){
        this.position = 0;
      }
      else{
        console.log('no hay coincidencias...');
      }
    }
    else{
      this.churchs = this.copychurchs;
    }
    this.position = 0;
    this.currentChurch = this.churchs[this.position];
  }
}


