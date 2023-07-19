import EventEmitter from "./EventEmitter.class";

export class Trigger extends EventEmitter{
    constructor(){
        super();  
    }

    skillsTrigger(){
        this.trigger('skills');
    }
}