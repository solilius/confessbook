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
import { MainComponent } from './components/manager/child-components/main/main.component';
import { SchedulerComponent } from './components/manager/child-components/scheduler/scheduler.component';
import { ArchiveComponent } from './components/manager/child-components/archive/archive.component';
import { NewConfessionComponent } from './components/manager/child-components/new-confession/new-confession.component';
import { UpdatesComponent } from './components/manager/child-components/updates/updates.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ConfessionComponent,
    ManagerComponent,
    ConfessionSentComponent,
    MainComponent,
    SchedulerComponent,
    ArchiveComponent,
    NewConfessionComponent,
    UpdatesComponent
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
