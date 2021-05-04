import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import MOCK_DATA from './data/transcripts.json';

import {Transcript} from '../../models/transcript';

@Injectable()
export default class TranscriptServiceMock {

    getCallTranscript(): Observable<Transcript | null> {
        return of(MOCK_DATA);
    }
}
