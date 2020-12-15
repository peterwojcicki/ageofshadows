function Kelp(scene, position, height) {
    const makeCurve = (height, nbSteps) => {
        const path = [];
        const stepSize = height / nbSteps;
        var radius = 4;
        for (let i =0; i < height ; i += stepSize) {
            path.push(new BABYLON.Vector3(radius * Math.sin(i * nbSteps / 400), i, radius * Math.cos(i * nbSteps / 400)));
        }
        return path;
    };

    var spiralFactor = 5;
    const curve = makeCurve(height, height * spiralFactor);

    this.tube = BABYLON.MeshBuilder.CreateTube("tube", {
        path: curve,
        radius: 0.1,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }, scene);

    var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
    myMaterial.diffuseColor = new BABYLON.Color3(0, 79.0 / 255.0, 35.0 / 255.0);
    //myMaterial.specularColor = new BABYLON.Color3(0.5, 0.6, 0.87);
    //myMaterial.emissiveColor = new BABYLON.Color3(1, 1, 1);
    //myMaterial.ambientColor = new BABYLON.Color3(0.23, 0.98, 0.53);
    this.tube.material = myMaterial;
    this.tube.position = position;
}

