var engine: TSE.Engine;

// The main entry point to the application.
window.onload = () => {
    engine = new TSE.Engine();
    engine.start();
    engine.resize();
};

window.onresize = () => {
    engine.resize();
};
