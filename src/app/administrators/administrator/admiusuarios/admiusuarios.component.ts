import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import { CreateUserComponent } from './create-user/create-user.component';

@Component({
  selector: 'app-admiusuarios',
  templateUrl: './admiusuarios.component.html',
  styleUrls: ['./admiusuarios.component.scss']
})
export class AdmiusuariosComponent implements OnInit {

  constructor( private location: Location, public dialog: MatDialog ) { }

  ngOnInit(): void {
  }



  openDialog() {
    const dialogRef = this.dialog.open(CreateUserComponent, {width: '80vw', height: 'auto'});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  back() {
    this.location.back();
  }
}
