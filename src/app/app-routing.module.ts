import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfessionComponent } from '../app/components/confession/confession.component';
import { ConfessionSentComponent } from '../app/components/confession-sent/confession-sent.component';
import { LoginComponent } from '../app/components/login/login.component';
import { ManagerComponent } from '../app/components/manager/manager.component';
import { MainComponent } from '../app/components/manager/child-components/main/main.component';
import { SchedulerComponent } from '../app/components/manager/child-components/scheduler/scheduler.component';
import { ArchiveComponent } from '../app/components/manager/child-components/archive/archive.component';
import { UpdatesComponent } from '../app/components/manager/child-components/updates/updates.component';


const routes: Routes = [
    { path: '', component: ConfessionComponent },
    { path: 'sent', component: ConfessionSentComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'manager', component: ManagerComponent,
        children: [
            { path: 'main', component: MainComponent },
            { path: 'scheduler', component: SchedulerComponent },
            { path: 'archive', component: ArchiveComponent },
            { path: 'updates', component: UpdatesComponent }
        ]
    },
    { path: '**', component: ConfessionComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
