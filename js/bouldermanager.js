function BoulderManager(scene) {
    this.mat = new BABYLON.StandardMaterial("boulder", scene);
    this.mat.diffuseTexture = new BABYLON.Texture("img/underwater_rock.jpg", scene);
    this.mat.specularColor = new BABYLON.Color3(0, 0, 0);
}

BoulderManager.prototype.accept = function (scene, groundPosition, depth) {
    let radius = 5 * Math.random();
    if (depth > 0) {
        new Boulder(groundPosition, radius, this.mat);
    }
}
