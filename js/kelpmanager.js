function KelpManager() {
    this.positions = [];
    this.positionsWithKelp = [];
    this.kelps = [];
}

KelpManager.prototype.accept = function (scene, groundPosition, depth) {
    if (depth > 0) {
        this.positions.push(groundPosition.add(new BABYLON.Vector3(0, -1, 0)));
    }
}

KelpManager.prototype.update = function (camera, water) {
    for (let i = 0; i < this.positions.length; i++) {

        let kelpPosition = this.positions[i];

        if (Math.abs(camera.position.x - kelpPosition.x) < 100
            && Math.abs(camera.position.z - kelpPosition.z) < 100) {

            if (!this.kelpExistsAtPosition(kelpPosition)) {
                window.console.log("KelpManager.update - show kelp at position " + kelpPosition);
                this.kelps.push(new Kelp(scene, kelpPosition, water.getPosition().y - kelpPosition.y));
                this.positionsWithKelp.push(kelpPosition);
            }
        }
    }
}

KelpManager.prototype.kelpExistsAtPosition = function (position) {
    for (let i = 0; i < this.positionsWithKelp.length; i++) {
        let positionWithKelp = this.positionsWithKelp[i];
        if ((positionWithKelp.x == position.x) && (positionWithKelp.z == position.z)) {
            return true;
        }
    }
    return false;
}