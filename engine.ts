namespace TSE {

    /**
     * the main engine class
     */
    export class Engine {

        private _count: number = 0;

        /**
         * Create a new engine.
         */

        public constructor() {

        }

        /**
         * start up this engine
         */

        public start():void {

            this.loop();
        }

        private loop():void {
            this._count++;

            document.title=this._count.toString();

            requestAnimationFrame(() => {
                this.loop();
            });
        }
    }
}