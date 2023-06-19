import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-create-peticion',
  templateUrl: './create-peticion.component.html',
  styleUrls: ['./create-peticion.component.scss']
})
export class CreatePeticionComponent implements OnInit {

  form: FormGroup;
  tokenVisible: boolean = false;
  reCAPTCHAToken: string = "";


  constructor( private fb: FormBuilder,
               private recaptchaV3Service: ReCaptchaV3Service, ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void{
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      pedido: ['', [Validators.required]],
      recaptchaReactive: ['', [Validators.required]]
    })
  }

  checkForm():void{

  }

  public addTokenLog(message: string, token: any | null) {
    console.log(`${message}: ${this.formatToken(token)}`);
  }

  public formatToken(token: string | null) {
    return token !== null
      ? `${token.substring(0, 7)}...${token.substring(token.length - 7)}`
      : 'null';
  }
}

