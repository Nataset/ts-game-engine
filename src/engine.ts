namespace TSE {
    /**
     * the main engine class
     */
    export class Engine {
        private _count: number = 0;
        private _canvas: HTMLCanvasElement | undefined;

        /**
         * Create a new engine.
         */

        public constructor() {}

        /**
         * start up this engine
         */

        public start(): void {
            this._canvas = GLUtilities.initialize();

            gl?.clearColor(0, 0, 0, 1);

            this.loop();
        }

        private loop(): void {
            gl?.clear(gl.COLOR_BUFFER_BIT);

            requestAnimationFrame(() => {
                this.loop();
            });
        }
    }
}
