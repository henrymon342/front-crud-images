import { Component, OnInit } from '@angular/core';
import { Global } from '../../../services/global';

@Component({
  selector: 'app-jni',
  templateUrl: './jni.component.html',
  styleUrls: ['./jni.component.scss']
})
export class JniComponent implements OnInit {

  public MINISTERIOS: any[] = Global.MINISTERIOS;

  constructor() { }

  ngOnInit(): void {
  }

}
