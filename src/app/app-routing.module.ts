import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablaDatosComponent } from './tabla-datos/tabla-datos.component';
import { GraficaComponent } from './grafica/grafica.component';
//import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';


const routes: Routes = [
  { path: "", component: GraficaComponent},
  { path: 'eventos', component: TablaDatosComponent },
  { path: "graficas", component: GraficaComponent},
  { path: "usuarios", component: TablaDatosComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
