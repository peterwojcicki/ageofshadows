function Fog() {
}

Fog.prototype.enableUnderwaterFog = function (scene) {

    scene.fogEnabled = true;
    scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    scene.fogColor = new BABYLON.Color3(0, 0.23, 0.27);
    scene.ambientColor = new BABYLON.Color3(0, 0.23, 0.27);
    scene.fogStart = 1.0;
    scene.fogEnd = 300.0;
    scene.fogDensity = 0.008;
    postProcess2 = new BABYLON.BlurPostProcess("Horizontal blur", new BABYLON.Vector2(1.0, 0), 20, 1.5, scene.activeCamera, BABYLON.Texture.DEFAULT_SAMPLINGMODE);
    postProcess3 = new BABYLON.BlurPostProcess("Vertical blur", new BABYLON.Vector2(0, 1.0), 20, 1.5, scene.activeCamera, BABYLON.Texture.DEFAULT_SAMPLINGMODE);

}

Fog.prototype.enableLandFog = function (scene) {
    scene.activeCamera.detachPostProcess(postProcess2);
    scene.activeCamera.detachPostProcess(postProcess3);

    scene.fogEnabled = false;
    //scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    //scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
    //scene.fogDensity = 0.001;

}

