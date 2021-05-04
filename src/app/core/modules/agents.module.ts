import { NgModule } from '@angular/core';

import AgentsService from '../services/agents.service';

@NgModule({
    providers: [
        AgentsService
    ]
})
export class AgentsModule {}
