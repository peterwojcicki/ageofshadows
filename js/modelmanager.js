function ModelManager(modelConfigs, scene) {

    var loader = new BABYLON.AssetsManager(scene);

    for (var i = 0; i < modelConfigs.length; i++) {

        var modelConfig = modelConfigs[i];

        var pos = function (t) {
            t.loadedMeshes.forEach(function (m) {

                var light = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
                light.includedOnlyMeshes.push(m);
                light.intensity = 0.3;

                m.rotation.y = t.customRotation;

                m.scaling.x = t.scaling;
                m.scaling.y = t.scaling;
                m.scaling.z = t.scaling;

                m.position.x = t.customPosition.x;
                m.position.y = t.customPosition.y;
                m.position.z = t.customPosition.z;

                // TODO make is a config variable
                m.checkCollisions = false;

            });
        };

        var hut = loader.addMeshTask("myModel", "", modelConfig.config.folder, modelConfig.config.file);
        hut.scaling = modelConfig.config.scaling;
        hut.modelPositionY = modelConfig.config.offsetY;
        hut.customPosition = modelConfig.position;
        hut.customRotation = modelConfig.rotationY;
        hut.onSuccess = pos;
    }

    loader.load();

}
