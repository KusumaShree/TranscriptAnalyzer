import { Injectable } from '@angular/core';
import { Agent } from '../models/agent';

import AgentsServiceMock from './mocks/agents.service.mock';

@Injectable()
export default class AgentsService extends AgentsServiceMock {
    getAgentName(agent_id:string = ''): string | undefined{
        let agent = this.getAgents().find((agent:Agent) => {
            return agent.agent_id === agent_id
        });
        return agent?.full_name;
    }
}
