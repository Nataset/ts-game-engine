var engine: TSE.Engine;

// The main entry point to the application.
window.onload = () => {
    engine = new TSE.Engine();
    engine.start();
};

window.onresize = () => {
    engine.resize();
};
