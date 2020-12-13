function Ground(scene, onReady) {
    groundConfig = {
        mixTexture: {
            path: "img/out.png",
            uScale: 1
        },
        texture1: {
            path: "img/grass2.jpg",
            uScale: 20000
        },
        texture2: {
            path: "img/pebbles.jpg",
            uScale: 20000
        },
        texture3: {
            path: "img/snow.jpg",
            uScale: 20000
        }
    };
    var groundTerrainMaterial = new BABYLON.TerrainMaterial("groundMaterial", scene);
    groundTerrainMaterial.mixTexture = new BABYLON.Texture(groundConfig.mixTexture.path, scene);
    groundTerrainMaterial.mixTexture.uScale = groundConfig.mixTexture.uScale;
    groundTerrainMaterial.mixTexture.vScale = groundConfig.mixTexture.uScale;
    groundTerrainMaterial.diffuseTexture1 = new BABYLON.Texture(groundConfig.texture1.path, scene);
    groundTerrainMaterial.diffuseTexture1.uScale = groundConfig.texture1.uScale;
    groundTerrainMaterial.diffuseTexture1.vScale = groundConfig.texture1.uScale;
    groundTerrainMaterial.diffuseTexture2 = new BABYLON.Texture(groundConfig.texture2.path, scene);
    groundTerrainMaterial.diffuseTexture2.uScale = groundConfig.texture2.uScale;
    groundTerrainMaterial.diffuseTexture2.vScale = groundConfig.texture2.uScale;
    groundTerrainMaterial.diffuseTexture3 = new BABYLON.Texture(groundConfig.texture3.path, scene);
    groundTerrainMaterial.diffuseTexture3.uScale = groundConfig.texture3.uScale;
    groundTerrainMaterial.diffuseTexture3.vScale = groundConfig.texture3.uScale;

    this.ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "img/heightmap.jpg", 10000, 10000, 300, 0, 1000, scene, false, onReady);
    this.ground.material = groundTerrainMaterial;
    this.ground.checkCollisions = true;
}

Ground.prototype.getGround = function () {
    return this.ground;
}

Ground.prototype.getHeightAtCoordinates = function (x, z) {
    return this.ground.getHeightAtCoordinates(x, z);
}
