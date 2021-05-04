import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CoreModule } from 'src/app/core/core.module';
import { AgentsModule } from 'src/app/core/modules/agents.module';
import { CallsModule } from 'src/app/core/modules/calls.module';
import { TranscriptModule } from 'src/app/core/modules/transcript.module';

import AnalyzerComponent from './analyzer.component';
import EmptyStateComponent from '../empty-state/empty-state.component';
import ParameterSelectionComponent from '../parameter-selection/parameter-selection.component';
import PieChartComponent from '../pie-chart/pie-chart.component';
import ScriptDataComponent from '../script-data/script-data.component';
import ScriptTableComponent from '../script-table/script-table.component';

import { ROUTES } from './analyzer.routes';

@NgModule({
    declarations: [
        AnalyzerComponent,
        EmptyStateComponent,
        ParameterSelectionComponent,
        PieChartComponent,
        ScriptDataComponent,
        ScriptTableComponent
    ],
    imports: [
        CoreModule,
        RouterModule.forChild(ROUTES),
        FormsModule,
        ReactiveFormsModule,

        MatCardModule,
        MatIconModule,
        MatSelectModule,
        MatSliderModule,
        MatTableModule,
        MatTooltipModule,

        AgentsModule,
        CallsModule,
        TranscriptModule
    ],
    bootstrap: [AnalyzerComponent]
})
export class AnalyzerModule {}
