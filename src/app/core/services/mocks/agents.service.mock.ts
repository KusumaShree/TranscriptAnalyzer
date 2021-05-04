import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import MOCK_DATA from './data/agents.json';

import {Agent} from '../../models/agent';

@Injectable()
export default class AgentsServiceMock {

    getAgentList(): Observable<Agent | null> {
        return of(MOCK_DATA);
    }

    getAgents(): Agent[] {
        return MOCK_DATA;
    }
}
