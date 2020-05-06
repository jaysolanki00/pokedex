import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeComponent } from './poke-theme/type/type.component';

const routes: Routes = [
  { path: 'type/:pokeType', component: TypeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
