function KelpManager() {
}

KelpManager.prototype.accept = function (scene, groundPosition, depth) {
    if (depth > 0) {
        new Kelp(scene, groundPosition.add(new BABYLON.Vector3(0, -1, 0)), 1.2 * depth);
    }
}

