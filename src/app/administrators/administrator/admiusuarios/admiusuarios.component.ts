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

  constructor( private location: Location ) { }

  ngOnInit(): void {
  }




  back() {
    this.location.back();
  }
}
