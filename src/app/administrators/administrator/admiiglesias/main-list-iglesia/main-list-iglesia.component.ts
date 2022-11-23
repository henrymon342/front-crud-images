import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Iglesia } from '../../../../models/iglesia';
import { MatDialog } from '@angular/material/dialog';
import { CreateIglesiaComponent } from '../create-iglesia/create-iglesia.component';

@Component({
  selector: 'app-main-list-iglesia',
  templateUrl: './main-list-iglesia.component.html',
  styleUrls: ['./main-list-iglesia.component.scss']
})
export class MainListIglesiaComponent implements OnInit {

  public dataSource = new MatTableDataSource<Iglesia>();
  displayedColumns: string[] = [ 'Nro', 'name', 'category', 'area', 'year', 'membresia', 'lugardeministerio', 'mas'];

  dialogRef: any;

  constructor( public dialog: MatDialog ) { }

  ngOnInit(): void {
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

  }

}
