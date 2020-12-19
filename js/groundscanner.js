function GroundScanner(scene, ground, water, kelpManager, boulderManager, treeManager, bushManager) {

    let step = 30;

    let xIteration = 0;
    let zIteration = 0;

    for (var x = -4900; x < 4900; x += step) {

        xIteration++;
        zIteration = 0;

        for (var z = -4900; z < 4900; z += step) {

            zIteration++

            var groundHeight = ground.getHeightAtCoordinates(x, z);
            let depth = water.getPosition().y - groundHeight;

            let currentGroundPosition = new BABYLON.Vector3(x, groundHeight, z);

            kelpManager.accept(scene, currentGroundPosition, depth);
            boulderManager.accept(scene, currentGroundPosition, depth);
            treeManager.accept(scene, currentGroundPosition, depth);

            if ((xIteration % 5 == 0) && (zIteration % 5 == 0)) {
                bushManager.accept(scene, currentGroundPosition, depth);
            }
        }
    }
}

