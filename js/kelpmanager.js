function KelpManager(scene, water, ground) {
    for (var x = -4990; x < 4990; x += 100) {
        for (var z = -4990; z < 4990; z += 100) {

            var groundHeight = ground.getHeightAtCoordinates(x, z);
            if (groundHeight < water.getPosition().y) {
                let height = water.getPosition().y - groundHeight;

                for (let i = 0; i < 1; i++) {
                    new Kelp(scene, new BABYLON.Vector3(x + Math.sin(i * Math.PI / 4), groundHeight - 1, z + Math.cos(i * Math.PI / 4)), 1.2 * height);
                }
            }
        }
    }
}

