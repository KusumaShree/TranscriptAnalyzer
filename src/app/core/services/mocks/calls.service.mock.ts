import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import MOCK_DATA from './data/calls.json';

import Calls from '../../models/calls';

@Injectable()
export default class CallsServiceMock {

    getCallList(): Observable<Calls | null> {
        return of(MOCK_DATA);
    }
}
