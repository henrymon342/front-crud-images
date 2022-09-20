import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  constructor( private location: Location ) { }

  ngOnInit(): void {
  }


  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
