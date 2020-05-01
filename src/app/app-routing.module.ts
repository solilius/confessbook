import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfessionComponent } from '../app/components/confession/confession.component';
import { LoginComponent } from '../app/components/login/login.component';
import { ManagerComponent } from '../app/components/manager/manager.component';
import { MainComponent } from '../app/components/manager/child-components/main/main.component';
import { SchedulerComponent } from '../app/components/manager/child-components/scheduler/scheduler.component';
import { ArchiveComponent } from '../app/components/manager/child-components/archive/archive.component';
import {AuthGuard } from './auth.guard';


const routes: Routes = [
    { path: '', component: ConfessionComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'manager', component: ManagerComponent,
        canActivate: [AuthGuard],
        children: [
            {  canActivate: [AuthGuard], path: 'main', component: MainComponent },
            {  canActivate: [AuthGuard], path: 'scheduler', component: SchedulerComponent },
            {  canActivate: [AuthGuard], path: 'scheduler/posts', component: SchedulerComponent },
            {  canActivate: [AuthGuard], path: 'archive', component: ArchiveComponent }
        ]
    },
    { path: '**', component: ConfessionComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
