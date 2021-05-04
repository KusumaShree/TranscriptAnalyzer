import { AfterViewInit, Component, ElementRef, Input, SimpleChange, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export default class PieChartComponent implements AfterViewInit{

    @ViewChild('pieCanvas') pieCanvas!: ElementRef<any>;

    @Input() pieData!:  number[];
    ctx: any;

    constructor() {

    }

    ngAfterViewInit() {
        this.drawPieChart();
    }

    ngOnChanges(change:any) {
        for(let prop in change) {
            change[prop].firstChange ? '' : this.drawPieChart();
        }
    }

    private drawPieChart() {
        this.ctx = this.pieCanvas.nativeElement.getContext('2d');
        this.ctx.clearRect(0, 0, this.pieCanvas.nativeElement.width, this.pieCanvas.nativeElement.height)
        this.ctx.lineWidth = 1;

        var PI2 = Math.PI * 2;
        var myColor = ["#5A5A71", "#e0e0e0"];
        
        var sweeps = [];
        let total = 100;
        for (var i = 0; i < this.pieData.length; i++) {
          sweeps.push(this.pieData[i] / total * PI2);
        }
  
        var accumAngle = 55;
        for (var i = 0; i < sweeps.length; i++) {
          this.drawWedge(accumAngle, accumAngle + sweeps[i], myColor[i]);
          accumAngle += sweeps[i];
        }
    }

    drawWedge(startAngle:any, endAngle:any, fill:any) {
        // draw the wedge
        var cx = 15;
        var cy = 15;
        var radius = 15;
        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy);
        this.ctx.arc(cx, cy, radius, startAngle, endAngle, false);
        this.ctx.closePath();
        this.ctx.fillStyle = fill;
        this.ctx.fill();
    }

}
