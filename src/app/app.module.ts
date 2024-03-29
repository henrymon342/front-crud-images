import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule} from '@angular/common/http';
import { MaterialModule } from '../Material/material.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from "@angular/common";
registerLocaleData(localeEs, 'es');

import { CookieService } from "ngx-cookie-service";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxDropzoneModule,
    FileUploadModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
