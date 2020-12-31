function Fog() {
}

Fog.prototype.enableUnderwaterFog = function (scene) {

    scene.fogEnabled = true;
    scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    scene.fogColor = new BABYLON.Color3(0, 0.23, 0.27);
    scene.ambientColor = new BABYLON.Color3(0, 0.23, 0.27);
    scene.fogStart = 1.0;
    scene.fogEnd = 100.0;
    scene.fogDensity = 0.008;

    this.postProcess2 = new BABYLON.BlurPostProcess("Horizontal blur", new BABYLON.Vector2(1.0, 0), 20, 1.5, scene.activeCamera, BABYLON.Texture.DEFAULT_SAMPLINGMODE);
    this.postProcess3 = new BABYLON.BlurPostProcess("Vertical blur", new BABYLON.Vector2(0, 1.0), 20, 1.5, scene.activeCamera, BABYLON.Texture.DEFAULT_SAMPLINGMODE);

}

Fog.prototype.enableLandFog = function (scene) {
    scene.activeCamera.detachPostProcess(this.postProcess2);
    scene.activeCamera.detachPostProcess(this.postProcess3);

    scene.fogEnabled = true;
    scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
    scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
    scene.fogDensity = 0.01;
    scene.fogStart = 100.0;
    scene.fogEnd = 500.0;

}

