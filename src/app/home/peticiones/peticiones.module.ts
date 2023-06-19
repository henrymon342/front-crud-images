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
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module, RecaptchaFormsModule, RecaptchaSettings, RecaptchaModule, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import {MatButtonModule} from '@angular/material/button';

const RECAPTCHA_V3_STACKBLITZ_KEY = '6LdcptYlAAAAAFz4UKzWsKYr18B0ftXnhxyCf-sp';
const RECAPTCHA_V2_DUMMY_KEY = '6LeJyXcgAAAAAH9cef1bCWTzk10ePkwqAKOVfbcT';

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
    MatButtonModule,
    RecaptchaModule,
    RecaptchaV3Module,
    // RecaptchaV3Module
    RecaptchaFormsModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: RECAPTCHA_V3_STACKBLITZ_KEY
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: RECAPTCHA_V2_DUMMY_KEY
      } as RecaptchaSettings
    }
  ]
})
export class PeticionesModule { }
