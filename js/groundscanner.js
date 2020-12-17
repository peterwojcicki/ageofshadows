function GroundScanner(scene, ground, water, kelpManager, boulderManager, treeManager) {
    for (var x = -4900; x < 4900; x += 30) {
        for (var z = -4900; z < 4900; z += 30) {

            var groundHeight = ground.getHeightAtCoordinates(x, z);
            let depth = water.getPosition().y - groundHeight;

            let currentGroundPosition = new BABYLON.Vector3(x, groundHeight, z);

            kelpManager.accept(scene, currentGroundPosition, depth);
            //boulderManager.accept(scene, currentGroundPosition, depth);
            treeManager.accept(scene, currentGroundPosition, depth);
        }
    }
}

