import { Component, OnInit } from '@angular/core';
import { EventoService } from "../evento.service";
import { Evento } from "../classes/evento";
import * as $ from 'jquery';
import { UserService } from '../user.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-tabla-datos',
  templateUrl: './tabla-datos.component.html',
  styleUrls: ['./tabla-datos.component.scss']
})
export class TablaDatosComponent implements OnInit {
  eventos: any;
  users: any;
  header: String[];
  constructor(protected eventoService: EventoService, protected userService: UserService, protected router: Router) { }
  evt: any;
  ngOnInit() {
    if (this.router.url === "/eventos") {
      this.header = ["id", "nombre", "resumen", "plazas totales", "plazas ocupadas", "precio", "dificultad", "material", "imagen", "deporte id", ""];

      this.eventoService.getEventsUser(localStorage.getItem("idUser"))
        .subscribe(
          (data) => { // Success
            this.eventos = data;
          },
          (error) => {
            console.error(error);
          }
        );
    } else if (this.router.url === "/usuarios") {


      this.header = ["id", "empresa", "username", "email", "password", "avatar", ""];
      this.userService.getUsers()
        .subscribe(
          (data) => { // Success
            this.users = data;

            console.log(this.users);
          },
          (error) => {
            console.error(error);
          }
        );
    }


  }
  setEditable(event) {
    if (this.router.url === "/eventos") {
      if ($("#" + event.id).find(".editableField").attr("contenteditable") == "true") {
        $("#" + event.id).find(".editableField").attr("contenteditable", false);


        event.nombre = $("#" + event.id).find(".nombre").text();
        event.resumen = $("#" + event.id).find(".resumen").text();
        event.plazas_totales = parseInt($("#" + event.id).find(".totales").text());
        event.plazas_ocupadas = parseInt($("#" + event.id).find(".ocupadas").text());
        event.precio = parseFloat($("#" + event.id).find(".precio").text());
        event.dificultad = parseInt($("#" + event.id).find(".dificultad").text());
        event.material = parseInt($("#" + event.id).find(".material").text());
        event.imagen = $("#" + event.id).find(".imagen").text(),
          event.deporte_id = parseInt($("#" + event.id).find(".deporte").text());

        this.eventoService.updateEvent(event).subscribe((data) => { // Success
        },
          (error) => {
            console.error(error);
          });

        $("#btnEdit").html("Edit");
        $("#btnDelete").html("Delete");
      } else {
        $("#" + event.id).find(".editableField").attr("contenteditable", true);
        //$("#" + event.id).find(".id").attr("contenteditable", false);
        $("#btnEdit").html("Save");
        $("#btnDelete").html("Undo");
      }
    } else if (this.router.url === "/usuarios") {
      if ($("#" + event.id).find(".editableField").attr("contenteditable") == "true") {
        $("#" + event.id).find(".editableField").attr("contenteditable", false);


        event.isbusiness = $("#" + event.id).find(".nombre").text();
        event.username = $("#" + event.id).find(".resumen").text();
        event.email = parseInt($("#" + event.id).find(".totales").text());
        event.password = parseInt($("#" + event.id).find(".ocupadas").text());
        event.avatar = parseFloat($("#" + event.id).find(".precio").text());

        this.userService.updateUser(event).subscribe((data) => { // Success


          console.log(data);
        },
          (error) => {
            console.error(error);
          });

        $("#btnEdit").html("Edit");
        $("#btnDelete").html("Delete");
      } else {
        $("#" + event.id).find(".editableField").attr("contenteditable", true);
        $("#btnEdit").html("Save");
        $("#btnDelete").html("Undo");
      }
    }

  }
  deleteEvent(event) {
    if ($("#" + event.id).find(".editableField").attr("contenteditable") == "true") {
      if (this.router.url === "/eventos") {

        $("#" + event.id).find(".editableField").attr("contenteditable", false);


        $("#" + event.id).find(".nombre").text(event.nombre);
        $("#" + event.id).find(".resumen").text(event.resumen);
        $("#" + event.id).find(".totales").text(event.plazas_totales);
        $("#" + event.id).find(".ocupadas").text(event.plazas_ocupadas);
        $("#" + event.id).find(".precio").text(event.precio);
        $("#" + event.id).find(".dificultad").text(event.dificultad);
       $("#" + event.id).find(".material").text(event.material);
       $("#" + event.id).find(".imagen").text(event.imagen),
         $("#" + event.id).find(".deporte").text(event.deporte_id);


        $("#btnDelete").html("Delete");
      } else if (this.router.url === "/usuarios") {
        $("#" + event.id).find(".editableField").attr("contenteditable", false);


        $("#" + event.id).find(".isbusiness").text(event.isbusiness);
        $("#" + event.id).find(".username").text(event.username);
        $("#" + event.id).find(".email").text(event.email);
        $("#" + event.id).find(".password").text(event.password);
        $("#" + event.id).find(".avatar").text(event.avatar);


        $("#btnDelete").html("Delete");
      } else {
        $("#" + event.id).find(".editableField").attr("contenteditable", true);
        $("#btnDelete").html("Undo");
      }
    } else {
      console.log("delete");
      
      this.eventoService.deleteEvent(event).subscribe(
        (data) => { // Success

          
        },
        (error) => {
          console.error(error);
        }
      );
    }

  }
  addEvent(event) {
    event.nombre = $("#" + event.id).find(".nombre").text();
    event.resumen = $("#" + event.id).find(".resumen").text();
    event.plazas_totales = parseInt($("#" + event.id).find(".totales").text());
    event.plazas_ocupadas = parseInt($("#" + event.id).find(".ocupadas").text());
    event.precio = parseFloat($("#" + event.id).find(".precio").text());
    event.dificultad = parseInt($("#" + event.id).find(".dificultad").text());
    event.material = parseInt($("#" + event.id).find(".material").text());
    event.imagen = $("#" + event.id).find(".imagen").text(),
      event.deporte_id = parseInt($("#" + event.id).find(".deporte").text());
    this.eventoService.updateEvent(event);
  }
}
