function ModelManager(modelConfigs, scene) {

    var loader = new BABYLON.AssetsManager(scene);

    for (var i = 0; i < modelConfigs.length; i++) {

        var modelConfig = modelConfigs[i];

        var firstMesh;
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

                firstMesh = m;
            });
        };

        var firstInstanceConfig = modelConfig.instances[0];

        var firstInstance = loader.addMeshTask("myModel", "", modelConfig.config.folder, modelConfig.config.file);
        firstInstance.scaling = modelConfig.config.scaling;
        firstInstance.modelPositionY = modelConfig.config.offsetY;
        firstInstance.customPosition = firstInstanceConfig.position;
        firstInstance.customRotation = firstInstanceConfig.rotationY;
        firstInstance.onSuccess = pos;

        setTimeout(function () {
            for (var i = 1; i < modelConfig.instances.length; i++) {
                var followingInstanceConfig = modelConfig.instances[i];
                var followingInstance = firstMesh.clone();
                followingInstance.position = followingInstanceConfig.position;
            }
        }, 2000);
    }

    loader.load();

}