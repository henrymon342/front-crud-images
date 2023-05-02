import { Component, OnInit } from '@angular/core';
import { Global } from '../../../services/global';

@Component({
  selector: 'app-mni',
  templateUrl: './mni.component.html',
  styleUrls: ['./mni.component.scss']
})
export class MniComponent implements OnInit {

  public MINISTERIOS: any[] = Global.MINISTERIOS;

  constructor() { }

  ngOnInit(): void {
  }

}
