import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ConfessionComponent } from './components/confession/confession.component';
import { ManagerComponent } from './components/manager/manager.component';
import { MainComponent } from './components/manager/child-components/main/main.component';
import { SchedulerComponent } from './components/manager/child-components/scheduler/scheduler.component';
import { ArchiveComponent } from './components/manager/child-components/archive/archive.component';
import { ConfessionItemComponent } from './components/manager/child-components/confession-item/confession-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import {CookieService } from 'ngx-cookie-service';
import { ArchivedConfessionItemComponent } from './components/manager/child-components/archived-confession-item/archived-confession-item.component';
import {AuthGuard } from './auth.guard';
import { FooterComponent } from './components/footer/footer.component';
import { ChipsComponent } from './components/chips/chips.component';
import { SchedulerItemComponent } from './components/manager/child-components/scheduler-item/scheduler-item.component';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfessionComponent,
    ManagerComponent,
    MainComponent,
    SchedulerComponent,
    ArchiveComponent,
    ConfessionItemComponent,
    ArchivedConfessionItemComponent,
    FooterComponent,
    ChipsComponent,
    SchedulerItemComponent,
    FloatingButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [CookieService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
