import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Iglesia } from '../../../../models/iglesia';
import { MatDialog } from '@angular/material/dialog';
import { CreateIglesiaComponent } from '../create-iglesia/create-iglesia.component';
import { IglesiaService } from '../services/iglesia.service';
import { Pastor } from '../../../../models/pastor';
import { PastorService } from '../../../admipastores/services/pastor.service';
import { ImageService } from '../../../../services/image.service';
import { ToastrService } from 'ngx-toastr';
import { ChangeService } from '../../../../services/change.service';

@Component({
  selector: 'app-main-list-iglesia',
  templateUrl: './main-list-iglesia.component.html',
  styleUrls: ['./main-list-iglesia.component.scss']
})
export class MainListIglesiaComponent implements OnInit {


  public dataSource = new MatTableDataSource<Iglesia>();
  displayedColumns: string[] = [ 'Nro', 'nombre', 'zona', 'pastor', 'fundacion', 'mas'];

  public isChange = false;
  public dialogRef: any;

  constructor( public dialog: MatDialog,
               private _churchService: IglesiaService,
               private _pastorService: PastorService,
               private _imagenService: ImageService,
               private toastr: ToastrService,
               private _changeService: ChangeService
               ) { }

  ngOnInit(): void {
    this._changeService.change.subscribe(isChange => {
      this.dialogRef.close();
      this.isChange = isChange;
    });
    this.getChurchs();
  }

  getChurchs(): void{
    this._churchService.getAll()
    .subscribe(res => {
      this.dataSource.data = res as Iglesia[];
      this.dataSource.data = this.sortData(this.dataSource.data);
      for ( const church of this.dataSource.data ) {
        const idPas = church.idPastor;
        this.getPastor(idPas).then((res) =>{
          church.pastorname = res.name;
        }).catch((error)=>{
          church.pastorname = 'no name';
          console.log(error);
        })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.dialogRef = this.dialog.open(CreateIglesiaComponent, {
                          width: '80vw',
                          height: '95vh',
                          panelClass: "dialog"
                          });

    this.dialogRef.afterClosed().subscribe((result:any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  popUpDeleteIglesia(id: number ): void{
    this._churchService.delete(id)
    .subscribe( async res => {
      console.log(await res);
      this.dataSource.data = this.dataSource.data.filter((item: Iglesia) => item.id!=id);
    })
    this.deleteImage(id);
    this.toastr.success('Satisfactoriamente!', 'Iglesia eliminada');
  }

  deleteImage(id: number){
    this._imagenService.delete(id).subscribe( res => {
      console.log(res);
    })
  }

  sortData(data:any[]){
    console.log(data);
    return data.sort((a:Iglesia, b:Iglesia)=>{
      if ( a.nombre.toLowerCase() < b.nombre.toLowerCase()){
        return -1;
      }
      if ( a.nombre.toLowerCase() > b.nombre.toLowerCase()){
        return 1;
      }
      return 0;
    });
  }

  setPastors(data:any[]){
    let aux = [];
    for (let church of data) {
      this.setChurch(church, 'hey!');
    }
    return aux;
  }

  setChurch( church:Iglesia, namePas:string ){
    const pas =  this.getPastor(church.idPastor);
  }

  async getPastor(id: number): Promise<Pastor>{
    const res = await this._pastorService.get(id).toPromise();
    return res || []
   }

}
