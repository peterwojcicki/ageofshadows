function GroundScanner(scene, ground, water, kelpManager, boulderManager, treeManager, bushManager) {

    let stepBase = 30;
    let step = stepBase + 10 * Math.random();

    let xIteration = 0;
    let zIteration = 0;

    for (var x = -4900; x < 4900; x += stepBase) {

        step = stepBase + 10 * Math.random();

        xIteration++;
        zIteration = 0;

        for (var z = -4900; z < 4900; z += stepBase) {

            step = stepBase + 10 * Math.random();

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

