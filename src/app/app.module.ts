import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ConfessionComponent } from './components/confession/confession.component';
import { ManagerComponent } from './components/manager/manager.component';
import { ConfessionSentComponent } from './components/confession-sent/confession-sent.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfessionComponent,
    ManagerComponent,
    ConfessionSentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
