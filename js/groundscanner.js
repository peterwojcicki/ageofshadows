function GroundScanner(scene, ground, water, kelpManager, boulderManager) {
    for (var x = -4900; x < 4900; x += 50) {
        for (var z = -4900; z < 4900; z += 50) {

            var groundHeight = ground.getHeightAtCoordinates(x, z);
            if (groundHeight < water.getPosition().y) {
                let depth = water.getPosition().y - groundHeight;

                let currentPosition = new BABYLON.Vector3(x, groundHeight, z);

                if ((x % 100 == 0) && (z % 100 == 0)) {
                    kelpManager.accept(scene, currentPosition, depth);
                }
                boulderManager.accept(scene, currentPosition, depth);
            }
        }
    }
}

