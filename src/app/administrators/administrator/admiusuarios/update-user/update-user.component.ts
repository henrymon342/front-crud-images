import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { User } from '../../../../models/user';
import { MyValidations } from '../../../../utils/my-validations';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  TYPEUSER: string[] = ['ACTIVIDADES', 'PASTORES'];
  MINISTERIOS: string[] = ['JNI', 'MNI', 'DNI'];
  IGLESIAS: string[] = [
    'CALLIRPA', 'CHAPICHAPINI', 'ROSAPATAYARIBAY', 'TOMATA', 'TOPOHOCO', 'TUMARAPI',// ZONA ANDINA PACAJES
    'CAQUIAVIRI', 'COLQUE ALTA', 'CHIPANAMAYA', 'LLIMPHI', 'LACALACA', 'LAURA AFETUNI', // ZONA CAQUIAVIRI
    'BAJO PANPAHASI', 'BUENOS AIRES', 'CENTRAL LA PAZ', 'EL BUEN PASTOR', 'KOINONIA', 'LA PORTADA',
    'MEMORIAL WINCHESTER', 'MIRAFLORES', 'MUNAYPATA', 'PASANKERI', 'VILLA FÁTIMA', 'ESCOBAR URIA',
    'PLAYA VERDE', 'SOPOCACHI BAJO', 'CHINCHAYA', 'CIUDADELA FERROVIARIA', // ZONA NORTE
    'ARANJUEZ', 'AVIRCATO', 'BELLA VISTA', 'CODAVISA', 'COTA COTA', '23 DE MARZO', 'MARQUIRIVI', // ZONA SUR
    'ANTARANI', 'BOTIJLACA', 'CANTUYO', 'COMANCHE', 'KELLAKELLA BAJA', 'JEKERI', 'ROSAPATA DE TULI', 'KELLAKELLA ALTA', // ZONA COMANCHE
    'CHULLUNKHAYANI', 'CONIRI', 'HILATA SAN JORGE', 'IRPUMA', 'VIACHA', 'COLQUENCHA', ' NUEVA TILATA 3',
    'TONCOPUJIO', 'MARISCAL SANTA CRUZ', // ZONA VIACHA
    'COHONI', 'TACACHÍA', 'QUILIHUAYA', // ZONA ILLIMANI
    'CALARI', 'COROCORO', 'GENERAL PANDO', 'PUTUNI', 'TUPALTUPA', 'TOTORANI', 'SICUIPATA', // ZONA MINERA
    'CALASAYA', 'CRUCERO', 'PATACAMAYA', 'CALTECA', 'CALACACHI', 'TOLOMA', // ZONA PATACAMAYA TAMBO QUEMADO
    'FE EN CRISTO', 'FILADELFIA', 'NUEVA VIDA', 'SHADDAI', 'LEUQUE', 'ALTO MUNAYPATA', 'IROCOTA'
    ];
    PLACES_MEMB: string[] = ['IGLESIA', 'OTRO'];

  form: FormGroup;
  place_choosed: string;
  ShowError: boolean = false;

  closeDialog: boolean = false;
  conter: number = 0;
  user: User = new User();
  hide = true;
  constructor( private route: ActivatedRoute,
               private fb: FormBuilder,
               private _serviceUser:UserService,
               private toastr: ToastrService
               ) {
                 this.createForm();
               }

  ngOnInit(): void {
    this.getUser();
  }


  validarPassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const { password, password_confirm } = control.value; // Extraemos valores de ambos campos necesarios
    if (password == password_confirm){
      return null; // Validación correcta, devolvemos null
    }
    return { message: true }; // validación incorrecta, devolvemos un error personalizado.
  };

  createForm(): void{
    this.form = this.fb.group({
      type: ['ACTIVIDADES', [Validators.required]],
      ministerio: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      option_places_memb: ['IGLESIA', [Validators.required]], // esta variable es auxiliar
      miembroen: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirm: ['', [Validators.required]],
    },
    { validators: [MyValidations.matchPassword ] }
    )
  }


  checkForm(): boolean{

    this.form.errors ? this.ShowError=true:this.ShowError=false;

    console.log('form: ', this.form.value);
    if( this.form.valid ){
      console.log('ES VALIDO');
      return true;
    }else{
      console.log('NO!, ES VALIDO');
      // this.error_text = this.form.errors!['message']
      console.log(this.form.errors!['message']);
      return false;
    }
  }

  clearOtherInput(){
    this.form.controls['miembroen'].setValue('');
  }

  changeValueMinistery(){
    if( this.form.value.type == 'PASTORES' ){
      this.form.controls['ministerio'].setValue(' ');
    }else{
      this.form.controls['ministerio'].setValue('');
    }
    this.checkForm();
  }


  alertCheckForm(){
    console.log(this.closeDialog);
    if(this.checkForm()){
      this.popUpValidForm();
    }
    else{
      this.popUpInvalidForm();
    }
  }


  popUpValidForm(){
    Swal.fire({
      title: '¿Esta seguro de guardar cambios?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: 'Si, lo estoy',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.editarUsuario();

      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  popUpInvalidForm(){
    this.showError();
  }


  editarUsuario(){
    let timerInterval: any;
    Swal.fire({
      title: 'Guardando cambios...',
      html: `Cerrando en <b></b> milisegundos.`,
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {

        Swal.showLoading()
        let b = Swal.getHtmlContainer()!.querySelector('b')
        timerInterval = setInterval(() => {
          b!.textContent = String(Swal.getTimerLeft())
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })

    this._serviceUser.update(this.user.id!, this.form.value).subscribe( res => {
      console.log(res);
      this.showSuccess();
    })
  }

  showSuccess() {
    this.toastr.success('Satisfactoriamente!', 'Cambios guardados');
    //////////////
  }

  showError(){
    this.toastr.error('No valido!', 'Formulario', {
      positionClass: 'toast-bottom-left'
   });
  }

  getUser(){
    const param = this.route.snapshot.params;
    this.user.id = param['id'];
    console.log(param['id']);
    this._serviceUser.get(this.user.id!).subscribe( (data: User) => {
      console.log(data);
      this.user = data;
      this.form.controls['name'].setValue(data.name);
      this.form.controls['lastname'].setValue(data.lastname);
      this.form.controls['type'].setValue(data.type);
      this.form.controls['cargo'].setValue(data.cargo);
      this.form.controls['ministerio'].setValue(data.ministerio);
      this.form.controls['username'].setValue(data.username);
      this.form.controls['password'].setValue(data.password);
      this.form.controls['password_confirm'].setValue(data.password);
      this.form.controls['miembroen'].setValue(data.miembroen);
      if(this.IGLESIAS.includes(data.miembroen)){
        console.log('YES INCLUDES', data.miembroen);
        this.form.controls['option_places_memb'].setValue('IGLESIA');
      }else{
        console.log('NO INCLUDES', data.miembroen);
        this.form.controls['option_places_memb'].setValue('OTRO');
      }
    })
  }


}
