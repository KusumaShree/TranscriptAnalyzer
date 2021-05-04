export default class Calls {
    call_id !: string;
    calltype_id !: string;
    call_start_time !: string;
    gs_file_url !: string;
    duration !: string;
    agent !: Agent[];
    customer !: Customer[];
}

class Agent {
    agent_id !: string;
    channel_no !: number;
}

class Customer {
    full_name !: string;
    channel_no !: number;
}