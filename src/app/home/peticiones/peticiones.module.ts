import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PeticionesRoutingModule } from './peticiones-routing.module';
import { CreatePeticionComponent } from './create-peticion/create-peticion.component';
import { ListPeticionComponent } from './list-peticion/list-peticion.component';
import { PeticionesComponent } from './peticiones.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from '../../../environments/environment';


@NgModule({
  declarations: [

    PeticionesComponent,
    CreatePeticionComponent,
    ListPeticionComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    PeticionesRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RecaptchaV3Module
  ],
  providers: [{
    provide: RECAPTCHA_V3_SITE_KEY,
    useValue: environment.recaptcha.siteKey,
  }],
})
export class PeticionesModule { }
