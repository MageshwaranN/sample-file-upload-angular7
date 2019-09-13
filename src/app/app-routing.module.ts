import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleFormComponent } from './components/sample-form/sample-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user-form',
    pathMatch: 'full'
  },
  {
    path: 'user-form',
    component: SampleFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
