import EventEmitter from "./EventEmitter.class";

export class Trigger extends EventEmitter{
    constructor(){
        super();  
    }

    materialTrigger(){
        this.trigger('materialsReady');
    }
}