import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-script-table',
    templateUrl: './script-table.component.html',
    styleUrls: ['./script-table.component.scss']
})
export default class ScriptTableComponent implements OnInit, AfterViewInit {
    @Input() columns!: string[];
    @Input() tableData: any;
    @Input() tableLabel!: string;
    @Input() percentage!: number;
    @Input() matchingLineNo!: number;

    @Output() highlightMatchingLine = new EventEmitter<any>();
    
    public pieData!: number[];
    ngOnInit() {
        this.pieData = [this.percentage, (100-this.percentage)];
    }
    ngOnChanges(change:any): void {
        for(let prop in change) {
            if(prop === 'percentage' && !change[prop].firstChange) {
                this.percentage = change[prop].currentValue;
                this.pieData = [this.percentage, (100-this.percentage)]
            }
        }
    }

    ngAfterViewInit(): void {
    }

    triggerHighlighitMatchingSentence(data:any) {
        if(data.matchingLineNo) {
            
            this.highlightMatchingLine.emit(data.matchingLineNo)
        } else {
            this.highlightMatchingLine.emit('');
        }
            
    }

}
