export class Event {
    private name: String;
    private description: String;
    private start: Date;
    //private end: Date;
    private type: EventType;
    private month: Number;
    constructor(name: String, des: String, type: EventType, start:Date){
        this.name = name;
        this.description =des;
        this.type = type;
        this.start = start;
    }
}

export enum EventType {
    birthday = 1,
    business,
    concert,
    TvShow,
    other
}


