import { Component, OnInit } from '@angular/core';
import { Global } from '../../services/global';

@Component({
  selector: 'app-enquecreemos',
  templateUrl: './enquecreemos.component.html',
  styleUrls: ['./enquecreemos.component.scss']
})
export class EnquecreemosComponent implements OnInit {

  public ARTICLES: any[] = Global.ARTICLES;

  constructor() { }

  ngOnInit(): void {
  }

}
