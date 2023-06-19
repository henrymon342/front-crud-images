import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor( private fb: FormBuilder,
              private _login_service: LoginService,
              private toastr: ToastrService,
              private router: Router,
              private _cookieService: CookieService ) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(){
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login(): void {
    console.log(this.form.value);
    this._login_service.authentication(this.form.value).subscribe( res => {

      if( res.token ){
        console.log('res', res);
        this._cookieService.set('token', res.token);
        this._cookieService.set('user', res.username);
        if( res.type == 'ACTIVIDADES' ){
          this.toastr.success('', 'Bienvenido a la Iglesia del Nazareno');
          this.router.navigate(['auth/admieventos']);
        }
        if( res.type == 'PASTORES' ){
          this.toastr.success('', 'Bienvenido a la Iglesia del Nazareno');
          const username = this._cookieService.get('user')
          console.log(username);
          if( username === 'henrymc' ){
            this.router.navigate(['/auth/administrador']);
          }else{
            this.router.navigate(['auth/admipastores']);
          }
        }
      }else{
        this.toastr.warning( '', res.message, {
          positionClass: 'toast-bottom-left'
        });
        console.log('res', res);
      }
    });
  }

}
