import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import CallsServiceMock from './mocks/calls.service.mock';
import Calls from '../models/calls';
import MOCK_DATA from '../services/mocks/data/calls.json';
import { filter } from 'rxjs/operators';

@Injectable()
export default class CallsService extends CallsServiceMock {

    getCallsByAgent(agent_id:string): Observable<Calls> {
        
        let filterData = MOCK_DATA.filter((call:Calls) => {
            return call.agent[0].agent_id === agent_id;
        });        
        return of(filterData);
        
    }

}
