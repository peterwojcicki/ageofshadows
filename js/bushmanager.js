function BushManager(scene) {
    // Fur Material
    this.furMaterial = new BABYLON.FurMaterial("fur", scene);
    this.furMaterial.furLength = 0.2;
    this.furMaterial.furAngle = 0;
    this.furMaterial.furColor = new BABYLON.Color3(0.04, 0.53, 0.02);
    this.furMaterial.diffuseTexture = new BABYLON.Texture("img/fur.jpg", scene);
    this.furMaterial.furTexture = BABYLON.FurMaterial.GenerateTexture("furTexture", scene);
    this.furMaterial.furSpacing = 10;
    this.furMaterial.furDensity = 3;
    this.furMaterial.furSpeed = 1000;
    this.furMaterial.furGravity = new BABYLON.Vector3(0, -0.3, 0);

    this.positions = [];
    this.positionsWithBush = [];
    this.bushs = [];
}

BushManager.prototype.accept = function (scene, groundPosition, depth) {
    if (depth < -10 && depth > -350) {
        this.positions.push(groundPosition.add(new BABYLON.Vector3(0, 0, 0)));
    }
}

BushManager.prototype.update = function (camera) {
    for (let i = 0; i < this.positions.length; i++) {

        let bushPosition = this.positions[i];

        if (distance(camera.position, bushPosition) < scene.fogEnd) {

            if (!this.bushExistsAtPosition(bushPosition)) {
                window.console.log("BushManager.update - show bush at position " + bushPosition);
                this.bushs.push(new Bush(bushPosition, 0.1, this.furMaterial));
                this.positionsWithBush.push(bushPosition);
            }
        }
    }
}

BushManager.prototype.bushExistsAtPosition = function (position) {
    for (let i = 0; i < this.positionsWithBush.length; i++) {
        let positionWithBush = this.positionsWithBush[i];
        if ((positionWithBush.x == position.x) && (positionWithBush.z == position.z)) {
            return true;
        }
    }
    return false;
}