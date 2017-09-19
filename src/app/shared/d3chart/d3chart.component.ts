import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, RGBColor, Selection, Timer } from 'd3-ng2-service';
import { TsvService } from '../../services/tsv.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
	selector: 'lfmc-d3chart',
	templateUrl: './d3chart.component.html',
	styleUrls: ['./d3chart.component.css']
})
export class D3chartComponent implements OnInit {
	private d3: D3; // <-- Define the private member which will hold the d3 reference
	private parentNativeElement: any;

  width: number;
  height: number;
  g: any;

	constructor(element: ElementRef, d3Service: D3Service, private tsv:TsvService) {
		this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
		this.parentNativeElement = element.nativeElement;
	}

	ngOnInit() {
		let d3 = this.d3; // <-- for convenience use a block scope variable
		let d3ParentElement: Selection<any, any, any, any>; // <-- Use the Selection interface (very basic here for illustration only)
    //
    //
		// if (this.parentNativeElement !== null) {
		// 	d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method
    //
		// 	let svg = d3.select("svg");
    //
		// 	var parseTime = d3.timeParse("%Y%m%d");
    //
		// 	var x = d3.scaleTime().range([0, this.width]),
		// 		y = d3.scaleLinear().range([this.height, 0]),
		// 		z = d3.scaleOrdinal(d3.schemeCategory10);
    //
		// 	var line = d3.line()
		// 		.curve(d3.curveBasis)
		// 		.x(function(d) { return x(d.date); })
		// 		.y(function(d) { return y(d.temperature); });
    //
		// 	this.tsv.get("data.tsv", type, function(error, data) {
		// 		if (error) throw error;
    //
		// 		var cities = data.columns.slice(1).map(function(id) {
		// 			return {
		// 				id: id,
		// 				values: data.map(function(d) {
		// 					return { date: d.date, temperature: d[id] };
		// 				})
		// 			};
		// 		});
    //
		// 		x.domain(d3.extent(data, function(d) { return d.date; }));
    //
		// 		y.domain([
		// 			d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
		// 			d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
		// 		]);
    //
		// 		z.domain(cities.map(function(c) { return c.id; }));
    //
		// 		g.append("g")
		// 			.attr("class", "axis axis--x")
		// 			.attr("transform", "translate(0," + height + ")")
		// 			.call(d3.axisBottom(x));
    //
		// 		g.append("g")
		// 			.attr("class", "axis axis--y")
		// 			.call(d3.axisLeft(y))
		// 			.append("text")
		// 			.attr("transform", "rotate(-90)")
		// 			.attr("y", 6)
		// 			.attr("dy", "0.71em")
		// 			.attr("fill", "#000")
		// 			.text("Temperature, ºF");
    //
		// 		var city = g.selectAll(".city")
		// 			.data(cities)
		// 			.enter().append("g")
		// 			.attr("class", "city");
    //
		// 		city.append("path")
		// 			.attr("class", "line")
		// 			.attr("d", function(d) { return line(d.values); })
		// 			.style("stroke", function(d) { return z(d.id); });
    //
		// 		city.append("text")
		// 			.datum(function(d) { return { id: d.id, value: d.values[d.values.length - 1] }; })
		// 			.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
		// 			.attr("x", 3)
		// 			.attr("dy", "0.35em")
		// 			.style("font", "10px sans-serif")
		// 			.text(function(d) { return d.id; });
		// 	});
    //
		// 	function type(d, _, columns) {
		// 		d.date = parseTime(d.date);
		// 		for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
		// 		return d;
		// 	}
		}
	}
