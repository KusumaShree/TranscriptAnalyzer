import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChange, TemplateRef, ViewChild } from '@angular/core';
import TranscriptService from 'src/app/core/services/transcript.service';
import AgentsService from 'src/app/core/services/agents.service';

import {CallTranscript, Script} from 'src/app/core/models/transcript';

@Component({
    selector: 'app-script-data',
    templateUrl: './script-data.component.html',
    styleUrls: ['./script-data.component.scss']
})
export default class ScriptDataComponent implements OnInit, AfterViewInit {

    @Input() callId!: string;
    @Input() sensitivity!: number;

    public columnsReal: string[] = ['Time', 'Speaker', 'Sentence'];
    public columnsExpected: string[] = ['Line', 'Speaker', 'Sentence'];
    public transcriptReal: CallTranscript[] | undefined = [];
    public transcriptExpected: Script[] | undefined = [];
    public percentageReal!: number;
    public percentageExpected!: number;
    public realMatchingLineNo!: number;
    public expectedMatchingLineNo!: number;

    constructor(private _transcriptService: TranscriptService,
                private _agentsService: AgentsService) {

    }

    ngOnInit() {
        this.loadTranscripts();
    }

    ngAfterViewInit(): void {
        
    }

    ngOnChanges(change:any): void {
        for(let prop in change) {
            if(prop === 'sensitivity' && !change[prop].firstChange) {
                this.sensitivity = change[prop].currentValue;
                this.calculatePercentages();
                this.calculateMatchingSentences();
            }
        }
    }

    public highlightMatchingLine(data:number, type:string) {
        if(type === 'expected') {
            !!data ? this.expectedMatchingLineNo = data : this.expectedMatchingLineNo = -1;
        } else {
            !!data ? this.realMatchingLineNo = data : this.realMatchingLineNo = -1;
        }
    }

    private loadTranscripts() {
        this._transcriptService.getCallTranscripts(this.callId).subscribe((transcriptDetails) => {
            this.transcriptReal = transcriptDetails?.transcript;
            let agentChannel = transcriptDetails?.agent[0].channel_no;
            let agentName = this._agentsService.getAgentName(transcriptDetails?.agent[0].agent_id);
            let customerName = transcriptDetails?.customer[0].full_name;
            let customerChannel = transcriptDetails?.customer[0].channel_no;

            this.transcriptReal?.forEach((rec:CallTranscript) => {
                (rec as any).Time = this.getTranscriptTime(rec.timeFrom);
                // let agentId = transcriptDetails?.agent[0].agent_id ? transcriptDetails?.agent[0].agent_id ;
                (rec as any).Speaker = rec.channel === agentChannel ? agentName : (
                    rec.channel === customerChannel ? customerName : 'Unknown'
                );
                (rec as any).Sentence = rec.sentence;
                rec.similarity = rec.similarity * 100;
                (rec as any).matchingLineNo = this.findMatchingLineNo(rec, transcriptDetails?.script);
            })

            this.transcriptExpected = transcriptDetails?.script;
            this.transcriptExpected?.forEach((rec:Script) => {
                (rec as any).Line = rec.order;
                (rec as any).Speaker = 'Rep:';
                (rec as any).Sentence = rec.sentence;
                rec.similarity = rec.similarity * 100;
                (rec as any).matchingLineNo = this.findMatchingLineNo(rec, transcriptDetails?.transcript);
            });
            this.calculatePercentages();
            this.calculateMatchingSentences();
        })
    }

    private findMatchingLineNo(record:any, dataArr:any) {
        if(!record.matching_sentence) return null;
        let ind = dataArr.findIndex((rec:any) => {
            return rec.matching_sentence === record.sentence;
        });
        return dataArr[ind]?.order;
    }

    private calculateMatchingSentences() {
        this.transcriptReal?.forEach((rec:CallTranscript) => {
            if(rec.similarity >= this.sensitivity) {
                (rec as any).isMatching = true;
            } else {
                (rec as any).isMatching = false;
            }
        });
        this.transcriptExpected?.forEach((rec:Script) => {
            if(rec.similarity * 100 >= this.sensitivity) {
                (rec as any).isMatching = true;
            } else {
                (rec as any).isMatching = false;
            }
        })
    }

    private calculatePercentages() {
        this.percentageReal = this.calculatePercentage(this.transcriptReal);
        this.percentageExpected = this.calculatePercentage(this.transcriptExpected);
    }

    private calculatePercentage(tableData:any) {
        let filterArr = tableData.filter((rec:any) => {
            return rec.similarity >= this.sensitivity 
        }).length;
        return Math.round((filterArr/tableData.length) * 100);
    }

    private getTranscriptTime(seconds:number) {
        const hour = Math.floor(seconds / 3600);
        const minute = Math.floor((seconds % 3600) / 60);
        const second = Math.round(seconds % 60);
        return [
            hour,
            minute > 9 ? minute : (hour ? '0' + minute : minute || '0'),
            second > 9 ? second : '0' + second
        ].filter(Boolean).join(':');
    }

}
