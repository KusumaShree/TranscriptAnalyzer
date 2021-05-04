class Transcript {
    call_id!: string;
    file_url!: string;
    calltype_id!: string;
    call_datetime!: string;
    duration!: string;
    agent!: Agent[];
    customer!: Customer[];
    script!: Script[];
    transcript!: CallTranscript[];
}
class Agent {
    agent_id!: string;
    channel_no!: number;
}
class Customer {
    full_name!: string;
    channel_no!: number;
}
class Script {
    order!: number;
    similarity!: number;
    sentence !: string;
    matching_sentence !: string;
}
class CallTranscript {
    order!: number;
    similarity!: number;
    sentence!: string;
    matching_sentence!: string;
    channel!:number;
    timeFrom!:number;
    timeTo!:number;
}

export {
    Transcript,
    Script,
    CallTranscript
}