"use strict";
var TSE;
(function (TSE) {
    /**
     * the main engine class
     */
    var Engine = /** @class */ (function () {
        /**
         * Create a new engine.
         */
        function Engine() {
            this._count = 0;
        }
        /**
         * start up this engine
         */
        Engine.prototype.start = function () {
            this._canvas = TSE.GLUtilities.initialize();
            TSE.gl === null || TSE.gl === void 0 ? void 0 : TSE.gl.clearColor(0, 0, 0, 1);
            this.loop();
        };
        Engine.prototype.loop = function () {
            var _this = this;
            TSE.gl === null || TSE.gl === void 0 ? void 0 : TSE.gl.clear(TSE.gl.COLOR_BUFFER_BIT);
            requestAnimationFrame(function () {
                _this.loop();
            });
        };
        return Engine;
    }());
    TSE.Engine = Engine;
})(TSE || (TSE = {}));
var TSE;
(function (TSE) {
    /**
     * Responsible for setting up a WebGL rendering context.
     */
    var GLUtilities = /** @class */ (function () {
        function GLUtilities() {
        }
        /**
         *  Initialize WebGl, potentially using the canvas with an assigned id matching the provided if it is defined.
         * @param elementId The id of the element to search for.
         * @returns
         */
        GLUtilities.initialize = function (elementId) {
            var canvas;
            if (elementId !== undefined) {
                canvas = document.getElementById(elementId);
                if (canvas === undefined) {
                    throw new Error('Cannot find a canvas element named:' + elementId);
                }
            }
            else {
                canvas = document.createElement('canvas');
                document.body.appendChild(canvas);
            }
            TSE.gl = canvas.getContext('webgl');
            if (TSE.gl === undefined && TSE.gl === null) {
                throw new Error('Unable to initialize WebGL!');
            }
            return canvas;
        };
        return GLUtilities;
    }());
    TSE.GLUtilities = GLUtilities;
})(TSE || (TSE = {}));
// The main entry point to the application.
window.onload = function () {
    var engine = new TSE.Engine();
    engine.start();
};
//# sourceMappingURL=main.js.map