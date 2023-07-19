import EventEmitter from './EventEmitter.class.js'

export default class Sizes extends EventEmitter
{
    constructor(_story)
    {
        super();

        // Setup
        this.story = _story;
        this.container = document.querySelector('#canvas-container-'+ this.story.name)
        this.canvas = this.story.canvas;
        
        const rect = this.container.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.pixelRatio = Math.min(this.width / this.height, 2);;

        // Resize event
        window.addEventListener('resize', () =>
        {
            const rect = this.container.getBoundingClientRect();
            this.width = rect.width;
            this.height = rect.height;
            this.pixelRatio = Math.min(this.width / this.height, 2);

            this.trigger('resize');
        })

        //Orientation change event
        window.onorientationchange = async () => {
            await this.sleep(10);
            const rect = this.container.getBoundingClientRect();
            this.width = rect.width;
            this.height = rect.height;
            this.pixelRatio = Math.min(this.width / this.height, 2);

            this.trigger('resize');
        }

        //Screen wake event
        document.addEventListener('visibilitychange', async () =>
        {
            if(document.hidden)
            {
            }
            else
            {
                await this.sleep(500);
                const rect = this.container.getBoundingClientRect();
                this.width = rect.width;
                this.height = rect.height;
                this.pixelRatio = Math.min(this.width / this.height, 2);
    
                this.trigger('resize');
            }
        })
    }

    //manual trigger
    resize()
    {
        console.log('click');
        const rect = this.container.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.pixelRatio = Math.min(this.width / this.height, 2);
        // this.canvas.pixelRatio = Math.min(this.width / this.height, 2);
        this.trigger('resize');
    }

    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}