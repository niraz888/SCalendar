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

export class lexicMonth  {
    public mapper: {[m:string] : string;} = {
    'Jan' : '01',
    'Feb' : '02',
    'Mar' : '03',
    'Apr' : '04',
    'May' : '05',
    'Jun' : '06',
    'Jul' : '07',
    'Aug' : '08',
    'Sep' : '09',
    'Oct' : '10',
    'Nov' : '11',
    'Dec' : '12',
    }
}

