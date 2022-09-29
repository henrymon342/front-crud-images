import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pastor } from '../../../models/pastor';
import { PastorService } from '../services/pastor.service';
import { ImageService } from '../../../services/image.service';
import { Image } from '../../../models/image';

@Component({
  selector: 'app-detail-pastor',
  templateUrl: './detail-pastor.component.html',
  styleUrls: ['./detail-pastor.component.scss']
})
export class DetailPastorComponent implements OnInit {

  pastor: Pastor = new Pastor();
  image: Image = new Image();
  titles: any[] = [];

  constructor( private route: ActivatedRoute, private _servicePastor: PastorService, private _serviceImage: ImageService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    const param = this.route.snapshot.params;
    this.pastor.id = param['id'];
    console.log(param['id']);
    this._servicePastor.get(this.pastor.id!).subscribe( (res: Pastor) => {
      console.log(res);
      this.pastor = res;
      this.createArrayTitles(this.pastor.titulos)
    });
    this.getImagePastor(this.pastor.id!);
  }


  createArrayTitles(titus?: string){
    if( !titus ){
      console.log('no existe');
    }else{
      console.log('existe');
    }

    console.log(titus);
    var listaaux = JSON.parse(titus+'');
    for (let variable in listaaux) {
      if (listaaux[variable] === true) {
        console.log(variable);
        this.titles.push({nombre: variable, valor: true});
      }else{
        this.titles.push({nombre: variable, valor: false});

      }
   }
    console.log(this.titles);

  }

  getImagePastor(id: number){
    this._serviceImage.get(id).subscribe( (res:Image) => {
      console.log(res);
      this.image = res;
    })
  }
}
