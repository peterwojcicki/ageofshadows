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

    this.bushes = [];
    let bushCount = 50;
    for (let i = 0; i < bushCount; i++) {
        this.bushes.push(new Bush(new BABYLON.Vector3(-100000, -10000, -100000), 0.1, this.furMaterial));
    }
}

BushManager.prototype.accept = function (scene, groundPosition, depth) {
    //if (depth < -10 && depth > -300) {
    //    this.positions.push(groundPosition.add(new BABYLON.Vector3(0, 0, 0)));
    //}
}

BushManager.prototype.update = function (camera) {
    for (let i = 0; i < this.positions.length; i++) {

        let bushPosition = this.positions[i];

        if (distance(camera.position, bushPosition) < scene.fogEnd) {

            if (!this.bushExistsAtPosition(bushPosition)) {

                // find a bush which is out of sight
                for (let bushIndex = 0; bushIndex < this.bushes.length; bushIndex++) {
                    let bush = this.bushes[bushIndex];

                    if (distance(camera.position, bush.getPosition()) > scene.fogEnd) {
                        bush.moveTo(bushPosition);

                        window.console.log("BushManager.update - moving bush to position " + bushPosition);

                        break;
                    }
                }
            }
        }
    }
}

BushManager.prototype.bushExistsAtPosition = function (position) {
    for (let bushIndex = 0; bushIndex < this.bushes.length; bushIndex++) {
        let bush = this.bushes[bushIndex];
        if ((bush.getPosition().x == position.x) && (bush.getPosition().z == position.z)) {
            return true;
        }
    }
    return false;
}