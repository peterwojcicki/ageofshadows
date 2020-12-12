function Water(scene, ground) {
    this.waterMesh = BABYLON.Mesh.CreateGround("waterMesh", 10000, 10000, 16, scene, false);
    this.waterMaterial = new BABYLON.WaterMaterial("water", scene, new BABYLON.Vector2(512, 512));
    this.waterMaterial.backFaceCulling = false;
    this.waterMaterial.bumpTexture = new BABYLON.Texture("img/waterbump.png", scene);
    this.waterMaterial.windForce = -10;
    this.waterMaterial.waveHeight = 1.7;
    this.waterMaterial.bumpHeight = 0.4;
    this.waterMaterial.waveLength = 0.01;
    this.waterMaterial.windDirection = new BABYLON.Vector2(1, 1);
    this.waterMaterial.waterColor = new BABYLON.Color3(0, 0, 221 / 255);
    this.waterMaterial.colorBlendFactor = 0.0;
    this.waterMaterial.addToRenderList(ground);
    this.waterMesh.material = this.waterMaterial;
    this.waterMesh.position = new BABYLON.Vector3(0, 90, 0);
}

Water.prototype.getPosition = function (camera) {
    return this.waterMesh.position;
}

Water.prototype.isUnderwater = function (camera) {
    return camera.position.y < this.waterMesh.position.y + 1;
}

