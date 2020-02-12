import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablaDatosComponent } from './tabla-datos/tabla-datos.component';
import { GraficaComponent } from './grafica/grafica.component';
import { EventoService } from "./evento.service";
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
//import bootstrap from "bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    TablaDatosComponent,
    GraficaComponent,
    SidebarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
