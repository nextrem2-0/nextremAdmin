import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/scripts/canvasjs.min.js';
import { UserService } from '../user.service';
import { EventoService } from "../evento.service";
import { $ } from 'protractor';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit {
  numUsers: any;
  eventos: any;
  numEventos: any;

  constructor(protected userService: UserService, protected eventoService: EventoService) {
  }

  ngOnInit() {
    //-----------------------------Primeros Datos

    this.userService.getUsers()
      .subscribe(
        (data) => { // Success
          this.numUsers = data;

          this.numUsers = this.numUsers.length;
        },
        (error) => {
          console.error(error);
        }
      );

    this.eventoService.getEventsUser(parseInt(localStorage.getItem("idUser")))
      .subscribe(
        (data) => { // Success

          this.eventos = data;
          console.log(this.eventos);
          
          this.numEventos = this.eventos.length;
          
        },
        (error) => {
          console.error(error);
        }
      );

    //-----------------------------Gráficas CanvasJS

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Eventos por deporte"
      },
      data: [{
        type: "column",
        dataPoints: [
          /* this.eventos.forEach(evento => {
            {y: ,label:evento.deporte_id }
          }) */
          { y: 71, label: "Escalada" },
          { y: 55, label: "Nieve" },
          { y: 50, label: "Surf" },
          { y: 65, label: "Rafting" },
          { y: 95, label: "Buceo" },
        ]
      }]
    });

    chart.render();

    let chartpie = new CanvasJS.Chart("chartpieContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Compras por deporte"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: 450, name: "Escalada" },
          { y: 120, name: "Nieve" },
          { y: 300, name: "Surf" },
          { y: 800, name: "Buceo" },
          { y: 150, name: "Rafting" },
        ]
      }]
    });

    chartpie.render();

    let dataPoints = [];
    let y = 0;
    for (var i = 0; i < 10000; i++) {
      y += Math.round(5 + Math.random() * (-5 - 5));
      dataPoints.push({ y: y });
    }
    let chartdata = new CanvasJS.Chart("chartdataContainer", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Nª ventas"
      },
      subtitles: [{
        text: "Último més"
      }],
      data: [
        {
          type: "line",
          dataPoints: dataPoints
        }]
    });

    chartdata.render();
  }

  
}

