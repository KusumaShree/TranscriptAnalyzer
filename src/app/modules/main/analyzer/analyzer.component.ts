import { AfterViewInit, ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChange, TemplateRef, ViewChild } from '@angular/core';
import ScriptDataComponent from '../script-data/script-data.component';

@Component({
    selector: 'app-analyzer',
    templateUrl: './analyzer.component.html',
    styleUrls: ['./analyzer.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
    // directives: [ScriptDataComponent]
})
export default class AnalyzerComponent implements OnInit, AfterViewInit {
    @ViewChild(ScriptDataComponent, {static: false}) scriptDataComp!: ScriptDataComponent;
    callId!:string;
    sensitivity!: number;
    DEFAULT_SENSITIVITY: number = 38;

    ngOnInit(): void {
        this.sensitivity = this.DEFAULT_SENSITIVITY;
    }

    ngAfterViewInit(): void {
    }
    onAgentCallChange(e:string) {
        this.callId = e;
    }

    onSensitivityChange(e:string) {
        this.sensitivity = parseInt(e);
        // this.scriptDataComp.calculatePercentages();
    }

    // TODO: Implement logic
}
