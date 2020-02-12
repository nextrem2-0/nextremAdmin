import { Component, OnInit } from '@angular/core';
import { EventoService } from "../evento.service";
import { Evento } from "../classes/evento";
import * as $ from 'jquery';
import { UserService } from '../user.service';
import { Router } from "@angular/router";
import { format } from 'url';


@Component({
  selector: 'app-tabla-datos',
  templateUrl: './tabla-datos.component.html',
  styleUrls: ['./tabla-datos.component.scss']
})
export class TablaDatosComponent implements OnInit {
  title: string;
  loader: boolean;
  eventos: any;
  users: any;
  header: String[];
  constructor(protected eventoService: EventoService, protected userService: UserService, protected router: Router) { }
  evt: any;
  ngOnInit() {
    if (this.router.url === "/eventos") {
      this.header = ["id", "nombre", "resumen", "plazas totales", "plazas ocupadas", "precio", "dificultad", "material", "imagen", "deporte id", ""];
      this.title = "Eventos";

      this.eventoService.getEventsUser(parseInt(localStorage.getItem("idUser")))
        .subscribe(
          (data) => { // Success

            this.eventos = data;
          },
          (error) => {
            console.error(error);
          }
        );
    } else if (this.router.url === "/usuarios") {
      this.title = "Usuarios";

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
        $("#image").hide();
        let form = new FormData();
        let nombre = $("#" + event.id).find(".nombre").text();
        let resumen = $("#" + event.id).find(".resumen").text();
        let plazas_totales = parseInt($("#" + event.id).find(".totales").text());
        let plazas_ocupadas = parseInt($("#" + event.id).find(".ocupadas").text());
        let precio = parseFloat($("#" + event.id).find(".precio").text());
        let dificultad = parseInt($("#" + event.id).find(".dificultad").text());
        let material = parseInt($("#" + event.id).find(".material").text());
         
        if($("#image")[0].files[0] !== undefined){
          let imagen = $("#image")[0].files[0];
          form.append("imagen",imagen);
        }
        let deporte_id = parseInt($("#" + event.id).find(".deporte").text());
        
          form.append('nombre', nombre);
          form.append('plazas_totales', plazas_totales.toString());
          form.append('plazas_ocupadas', plazas_ocupadas.toString());
          form.append('precio', precio.toString());
          form.append('dificultad', dificultad.toString());
          form.append('material', material.toString());
          form.append('resumen', resumen);
          form.append('deporte_id', deporte_id.toString());
            $.ajax({
          url: "http://api.nextrem.pve2.fpmislata.com/public/editarEvento",
          //data: { isbusiness: $boolBusiness, username: $("#user").val(), email: $("#email").val(), password: $("#pass_register").val(), password_confirmation: $("#pass_confirm_register").val(), avatar: $("#fileRegister")[0].files[0] },
          type: 'patch',
          dataType : 'json',
          contentType: false,
          processData: false,
          data: form,
          success: function (dataResult) {
            console.log(dataResult);
            
          },
          error: function (e) {
              console.log(e);
              
          }
      });
        // this.eventoService.updateEvent(form).subscribe((data) => { // Success
        //   console.log(data);
          
        // },
        //   (error) => {
        //     console.error(error);
        //   });

        $("#btnEdit").html("Edit");
        $("#btnDelete").html("Delete");
      } else {
        $("#" + event.id).find(".editableField").attr("contenteditable", true);
        //$("#" + event.id).find(".id").attr("contenteditable", false);
        $("#image").show();
        $("#btnEdit").html("Save");
        $("#btnDelete").html("Undo");
      }
    } else if (this.router.url === "/usuarios") {
      if ($("#" + event.id).find(".editableField").attr("contenteditable") == "true") {
        $("#" + event.id).find(".editableField").attr("contenteditable", false);
        $("#image").hide();
        let form = new FormData();
        let isbusiness = $("#" + event.id).find(".isbusiness").text();
        let username = $("#" + event.id).find(".username").text();
        let email = $("#" + event.id).find(".email").text();
        let password = $("#" + event.id).find(".password").text();
        
        if($("#image")[0].files[0] !== undefined){
          let avatar = $("#image")[0].files[0]
          form.append("avatar",avatar);
        }
        
        form.append('isbusiness', isbusiness);
        form.append('username', username);
        form.append('email', email);
        form.append('password', password);
        this.userService.updateUser(form).subscribe((data) => { // Success


          console.log(data);
        },
          (error) => {
            console.error(error);
          });

        $("#btnEdit").html("Edit");
        $("#btnDelete").html("Delete");
      } else {
        $("#" + event.id).find(".editableField").attr("contenteditable", true);
        $("#image").show();
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
        $("#btnEdit").html("Edit");
      } else if (this.router.url === "/usuarios") {
        $("#" + event.id).find(".editableField").attr("contenteditable", false);


        $("#" + event.id).find(".isbusiness").text(event.isbusiness);
        $("#" + event.id).find(".username").text(event.username);
        $("#" + event.id).find(".email").text(event.email);
        $("#" + event.id).find(".password").text(event.password);
        $("#" + event.id).find(".avatar").text(event.avatar);


        $("#btnDelete").html("Delete");
        $("#btnEdit").html("Edit");
      } else {
        $("#" + event.id).find(".editableField").attr("contenteditable", true);
        $("#btnDelete").html("Undo");
      }
    } else {

      this.eventoService.deleteEvent(event).subscribe(
        (data) => { // Success


        },
        (error) => {
          console.error(error);
        }
      );
    }

  }
  addEvent() {
    if ($("#new").find(".editableField").attr("contenteditable") == "true") {
      if (this.router.url === "/eventos") {
        let form = new FormData();

        let nombre = $("#new").find(".nombre").text();
        let resumen = $("#new").find(".resumen").text();
        let plazas_totales = parseInt($("#new").find(".totales").text());
        let plazas_ocupadas = parseInt($("#new").find(".ocupadas").text());
        let precio = parseFloat($("#new").find(".precio").text());
        let dificultad = parseInt($("#new").find(".dificultad").text());
        let material = parseInt($("#new").find(".material").text());
        if($("#image")[0].files[0] !== undefined){
        let imagen = $("#image")[0].files[0];
        form.append('imagen', imagen);
        }
        let deporte_id = parseInt($("#new").find(".deporte").text());
        
        form.append('nombre', nombre);
        form.append('plazas_totales', plazas_totales.toString());
        form.append('plazas_ocupadas', plazas_ocupadas.toString());
        form.append('precio', precio.toString());
        form.append('dificultad', dificultad.toString());
        form.append('material', material.toString());
        form.append('resumen', resumen);
        form.append('deporte_id', deporte_id.toString());
      //   $.ajax({
      //     url: "http://api.nextrem.pve2.fpmislata.com/public/addEvento",
      //     //data: { isbusiness: $boolBusiness, username: $("#user").val(), email: $("#email").val(), password: $("#pass_register").val(), password_confirmation: $("#pass_confirm_register").val(), avatar: $("#fileRegister")[0].files[0] },
      //     type: 'post',
      //     dataType : 'json',
      //     contentType: false,
      //     processData: false,
      //     data: form,
      //     success: function (dataResult) {
      //       console.log(dataResult);
            
      //     },
      //     error: function (e) {
      //         console.log(e);
              
      //     }
      // });

        this.eventoService.addEvent(form).subscribe((data) => { // Success
          console.log(data);
          //location.reload();
          
        },
          (error) => {
            console.error(error);
          });
      } else if (this.router.url === "/usuarios") {
        let form = new FormData();
        let isbusiness = $("#new").find(".isbusiness").text();
        let username = $("#new").find(".username").text();
        let email = $("#new").find(".email").text();
        let password = $("#new").find(".password").text();
        if($("#image")[0].files[0] !== undefined){
        let avatar = $("#image")[0].files[0];
        form.append('avatar', avatar);
        }
        form.append('isbusiness', isbusiness);
        form.append('username', username);
        form.append('email', email);
        form.append('password', password);
        console.log($("#image"));
        

        
        this.userService.addUser(form).subscribe((data) => { // Success


          console.log(data);
          location.reload();
        },
          (error) => {
            console.error(error);
          });
      }
      $("#new").find(".editableField").attr("contenteditable", false);
      $("#btnNew").html("New");
    } else {
      $("#new").find(".editableField").attr("contenteditable", true);
      $("#btnNew").html("Save");
    }
  }

}
