namespace TSE {
    /**
     * Represents a WebGl shader.
     */
    export class Shader {
        private _name: string;
        private _program: WebGLProgram | null = null;
        private _attributes: { [name: string]: number } = {};
        private _uniforms: { [name: string]: WebGLUniformLocation } = {};

        /**
         * Creates a new shader.
         * @param name The name of this shader.
         * @param vertexSource  The source of the vertex shader.
         * @param fragmentSource The source of the fragment shader.
         */

        public constructor(name: string, vertexSource: string, fragmentSource: string) {
            this._name = name;
            let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
            let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);

            this.createProgram(vertexShader, fragmentShader);

            this.detectAttributes();
            this.detectUniforms();
        }

        /**
         *
         * @returns The name of this shader.
         */

        public get name(): string {
            return this._name;
        }

        /**
         *  Use this shader
         */
        public use(): void {
            if (this._program) {
                gl.useProgram(this._program);
            } else {
                throw new Error('_program is undefind');
            }
        }

        /**
         *  get the location of an attribute with the provide name.
         * @param name The name of the attribute whose location to retrieve.
         * @returns
         */
        public getAttributeLocation(name: string): number {
            if (this._attributes[name] === undefined) {
                throw new Error(
                    `Unable to find arttributes named ${name} in shader named ${this._name}`,
                );
            }
            return this._attributes[name];
        }

        public getUnformLocation(name: string): WebGLUniformLocation {
            if (this._uniforms[name] === undefined) {
                throw new Error(
                    `Unable to find uniforms named ${name} in shader named ${this._name}`,
                );
            }
            return this._uniforms[name];
        }

        public loadShader(source: string, shaderType: number): WebGLShader {
            let shader: WebGLShader = gl.createShader(shaderType) as WebGLShader;

            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            let error = gl.getShaderInfoLog(shader);
            if (error !== '') {
                throw new Error(' Error complie shader ' + error);
            }

            return shader;
        }

        private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): void {
            this._program = gl.createProgram() as WebGLProgram;

            gl.attachShader(this._program, vertexShader);
            gl.attachShader(this._program, fragmentShader);

            gl.linkProgram(this._program);

            let error = gl.getProgramInfoLog(this._program);
            if (error !== '') {
                throw new Error(' Error linking shader' + this._name + ': ' + error);
            }
            return;
        }

        private detectAttributes(): void {
            if (this._program) {
                let attributeCount = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);
                for (let i = 0; i < attributeCount; ++i) {
                    let attributeInfo = gl.getActiveAttrib(this._program, i);
                    if (!attributeInfo) {
                        break;
                    }

                    this._attributes[attributeInfo.name] = gl.getAttribLocation(
                        this._program,
                        attributeInfo.name,
                    );
                }
            }
        }

        private detectUniforms(): void {
            if (this._program) {
                let uniformCount = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
                for (let i = 0; i < uniformCount; ++i) {
                    let info = gl.getActiveUniform(this._program, i);
                    if (!info) {
                        break;
                    }

                    this._uniforms[info.name] = gl.getUniformLocation(
                        this._program,
                        info.name,
                    ) as WebGLUniformLocation;
                }
            }
        }
    }
}
