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
import { CookieService } from 'ngx-cookie-service';
import { ArchivedConfessionItemComponent } from './components/manager/child-components/archived-confession-item/archived-confession-item.component';
import { AuthGuard } from './auth.guard';
import { FooterComponent } from './components/footer/footer.component';
import { ChipsComponent } from './components/chips/chips.component';
import { SchedulerItemComponent } from './components/manager/child-components/scheduler-item/scheduler-item.component';
import { CronJobComponent } from './components/cron-job/cron-job.component';
import { SchedulerAddComponent } from './components/manager/child-components/scheduler-add/scheduler-add.component';
import { TagsSelectorComponent } from './components/tags-selector/tags-selector.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { NgxMatDatetimePickerModule } from "@angular-material-components/datetime-picker";
import { NgxMatMomentModule } from "@angular-material-components/moment-adapter";
import { SchedulePostDialogComponent } from './components/manager/child-components/schedule-post-dialog/schedule-post-dialog.component';
import { PostItemComponent } from './components/manager/child-components/post-item/post-item.component';
import { PostsListComponent } from './components/manager/child-components/scheduler/posts-list/posts-list.component';
import { SchedulersListComponent } from './components/manager/child-components/scheduler/schedulers-list/schedulers-list.component';

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
        CronJobComponent,
        SchedulerAddComponent,
        TagsSelectorComponent,
        SchedulePostDialogComponent,
        PostItemComponent,
        PostsListComponent,
        SchedulersListComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        MatDatepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatMomentModule
    ],
    providers: [CookieService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule { }
