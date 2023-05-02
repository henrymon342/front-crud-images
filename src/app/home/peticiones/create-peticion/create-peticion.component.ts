import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
               private recaptchaV3Service: ReCaptchaV3Service ) { }

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
    })
  }

  checkForm():void{

  }

  sendPeticion(){
    this.recaptchaV3Service.execute('importantAction').subscribe((token: string) => {
      this.tokenVisible = true;
      this.reCAPTCHAToken = `Token [${token}] generated`;
    });
  }

}
