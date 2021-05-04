import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {filter, find} from 'rxjs/operators';
import {Transcript} from '../models/transcript';
import MOCK_DATA from '../services/mocks/data/transcripts.json';
import TranscriptServiceMock from './mocks/transcripts.service.mock';

@Injectable()
export default class TranscriptService extends TranscriptServiceMock {
    getCallTranscripts(callId:string): Observable<Transcript | null> {
        return of(MOCK_DATA).pipe(
            filter((call:Transcript) => call.call_id === callId)
        );
    }
}
