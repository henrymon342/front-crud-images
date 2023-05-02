import { Component, OnInit } from '@angular/core';
import { Global } from '../../../services/global';

@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.scss']
})
export class DniComponent implements OnInit {

  public MINISTERIOS: any[] = Global.MINISTERIOS;

  constructor() { }

  ngOnInit(): void {
  }

}
