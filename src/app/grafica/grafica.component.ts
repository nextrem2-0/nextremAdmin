import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/scripts/canvasjs.min.js';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss']
})
export class GraficaComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Eventos por deporte"
      },
      data: [{
        type: "column",
        dataPoints: [
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
        text: "Monthly Expense"
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
        text: "Performance Demo - 10000 DataPoints"
      },
      subtitles: [{
        text: "Try Zooming and Panning"
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

