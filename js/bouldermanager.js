function BoulderManager(scene) {
    this.defaultMaterial = new BABYLON.StandardMaterial("boulder", scene);
    this.defaultMaterial.diffuseTexture = new BABYLON.Texture("img/underwater_rock.jpg", scene);
    this.defaultMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    this.positions = [];
    this.positionsWithBoulder = [];
    this.boulders = [];
}

BoulderManager.prototype.accept = function (scene, groundPosition, depth) {
    if (depth > 0) {
        this.positions.push(groundPosition.add(new BABYLON.Vector3(0, -1, 0)));
    }
}

BoulderManager.prototype.update = function (camera) {
    for (let i = 0; i < this.positions.length; i++) {

        let boulderPosition = this.positions[i];

        if (Math.abs(camera.position.x - boulderPosition.x) < 100
            && Math.abs(camera.position.z - boulderPosition.z) < 100) {

            if (!this.boulderExistsAtPosition(boulderPosition)) {
                window.console.log("BoulderManager.update - show boulder at position " + boulderPosition);
                this.boulders.push(new Boulder(boulderPosition, 5.0 * Math.random(), this.defaultMaterial));
                this.positionsWithBoulder.push(boulderPosition);
            }
        }
    }
}

BoulderManager.prototype.boulderExistsAtPosition = function (position) {
    for (let i = 0; i < this.positionsWithBoulder.length; i++) {
        let positionWithBoulder = this.positionsWithBoulder[i];
        if ((positionWithBoulder.x == position.x) && (positionWithBoulder.z == position.z)) {
            return true;
        }
    }
    return false;
}