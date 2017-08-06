import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'lfmc-layer-map',
  templateUrl: './layer-map.component.html',
  styleUrls: ['./layer-map.component.css']
})
export class LayerMapComponent implements OnInit {

  private chartData: Array<any>;

  constructor() { }

  ngOnInit() {
    jQuery('.ui.accordion').accordion();

    setTimeout(() => {
      this.generateData();

      setInterval(() => this.generateData(), 3000);
    }, 1000);

  }

  generateData() {
    this.chartData = [];

    for(let i=0; i< (8 + Math.floor(Math.random() * 10)); i++) {
      this.chartData.push([
        `Index ${i}1`,
        Math.floor(Math.random() *100)
      ]);
    }
  }

}
