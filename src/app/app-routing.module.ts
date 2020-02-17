import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfessionComponent } from '../app/components/confession/confession.component';
import { ConfessionSentComponent} from '../app/components/confession-sent/confession-sent.component';
import { LoginComponent } from '../app/components/login/login.component';
import { ManagerComponent } from '../app/components/manager/manager.component';


const routes: Routes = [
    {path: '', component: ConfessionComponent},
    {path: 'sent', component: ConfessionSentComponent},
    {path: 'login', component: LoginComponent},
    {path: 'manager', component: ManagerComponent},
    {path: '**', component: ConfessionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
