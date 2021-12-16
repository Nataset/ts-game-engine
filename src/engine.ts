namespace TSE {
    /**
     * the main engine class
     */
    export class Engine {
        private _canvas: HTMLCanvasElement | undefined;
        private _shader: Shader | undefined;

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

            this.loadShaders();
            if (this._shader) {
                this._shader.use();
            } else {
                console.log("WebGl didn't use shader");
            }
            this.loop();
        }

        /**
         *  Resizes the canvas to fit the window
         */
        public resize(): void {
            if (this._canvas !== undefined) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;
            }
        }

        private loop(): void {
            gl.clear(gl.COLOR_BUFFER_BIT);

            requestAnimationFrame(() => {
                this.loop();
            });
        }

        private loadShaders(): void {
            let vertexShaderSource = `
                attribute vec3 a_position;
                void main() {
                    gl_Position = vec4(a_position, 1.0);
                };
                `;

            let fragmentShaderSource = `
                precision mediummp float;
                void main() {
                    gl_FragColor = ve4(1.0);
                };
            `;

            this._shader = new Shader('basic', vertexShaderSource, fragmentShaderSource);
        }
    }
}
