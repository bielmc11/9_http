import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormComponent } from './components/form/form.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'}, // ESTO SE LLAMA RUTA AMIGABLE podria hacer home de inicio o que rediriga a home
  {path:'home', component: HomeComponent},
  {path: 'newpost', component: FormComponent},
  {path: 'updatepost/:idpost', component:FormComponent},
  {path:'viewpost/:idpost', component: ViewPostComponent},
  {path:'**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
