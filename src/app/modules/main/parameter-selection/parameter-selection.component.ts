import { AfterViewInit, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import TemplateService from 'src/app/core/services/template.service';
import AgentsService from 'src/app/core/services/agents.service';
import CallsService from 'src/app/core/services/calls.service';

import Calls from 'src/app/core/models/calls';

@Component({
    selector: 'app-parameter-selection',
    templateUrl: './parameter-selection.component.html',
    styleUrls: ['./parameter-selection.component.scss']
})
export default class ParameterSelectionComponent implements OnInit, AfterViewInit {

    @Output() onCallChange = new EventEmitter<string>();
    @Output() onSensitivityChange = new EventEmitter<string>();

    @ViewChild('subHeader')
    subHeader?: TemplateRef<any>;

    get form(): FormGroup {
        return this._form;
    }
    private _form: FormGroup;
    public agentList:any = [];
    public calls:any = [];
    public agentCalls:any = [];
    public DEFAULT_SENSITIVITY:number = 38;
    public sensitivity: any = 0
    public disabled:boolean = false;

    constructor(private _tplService: TemplateService, 
                private _fb: FormBuilder,
                private _agentsService: AgentsService,
                private _callsService: CallsService) {
        this._form = this._fb.group({
            agent: _fb.control(null),
            call: _fb.control({
                value: null,
                disabled: true
            }),
            sensitivity: _fb.control(null)
        });
    }

    ngOnInit() {
        this._agentsService.getAgentList().subscribe((agents) => {
            this.agentList = agents;
        }, (error) => {
        })

        this._callsService.getCallList().subscribe((calls) => {
            this.calls = calls;
        })
    }

    ngAfterViewInit(): void {
        this._tplService.register('subHeader', this.subHeader);
    }

    onAgentChange() {
        //get calls by agent
        this._callsService.getCallsByAgent(this._form.value.agent).subscribe((agentCalls:any) => {
            this.agentCalls = agentCalls.map((call:Calls) => {
                return {
                    call_id: call.call_id,
                    call_start_time: call.call_start_time.split(" ")[0],
                    call_full_name: call.customer[0].full_name
                }
            });
            this._form.controls['call'].enable();
        })
        this._form.controls['call'].enable();
    }

    onAgentCallChange() {
        this.sensitivity = this.DEFAULT_SENSITIVITY;
        this.onCallChange.emit(this._form.value.call);
    }

    onSensitivitySliderChange() {
        this.onSensitivityChange.emit(this._form.value.sensitivity);
    }

}
