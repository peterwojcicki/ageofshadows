function TreeManager() {
    //trunk and branch material
    this.barkMaterial = new BABYLON.StandardMaterial("bark", scene);
    this.barkMaterial.emissiveTexture = new BABYLON.Texture("img/bark.jpg", scene);
    this.barkMaterial.diffuseTexture = new BABYLON.Texture("img/bark.jpg", scene);
    this.barkMaterial.diffuseTexture.uScale = 2.0;//Repeat 5 times on the Vertical Axes
    this.barkMaterial.diffuseTexture.vScale = 2.0;//Repeat 5 times on the Horizontal Axes
    this.barkMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    this.radius = 60;
    this.woods = [];

    for (let x = -4000; x < 4000; x += 1000) {
        for (let z = -4000; z < 4000; z += 1000) {
            this.woods.push(new BABYLON.Vector3(x, 0, z));
        }
    }

    this.firstTree = undefined;
}

TreeManager.prototype.accept = function (scene, groundPosition, depth) {
    if (depth < -100 && depth > -200) {

        for (let i = 0; i < this.woods.length; i++) {
            let woodPosition = this.woods[i];

            if ((Math.abs(woodPosition.x - groundPosition.x) < this.radius)
                && (Math.abs(woodPosition.z - groundPosition.z) < this.radius)) {
                if (!this.firstTree) {
                    let tree = new Tree(scene, groundPosition.add(new BABYLON.Vector3(0, -1, 0)), this.barkMaterial);
                    this.firstTree = tree;
                } else {
                    let clonedTree = this.firstTree.getMesh().clone();
                    clonedTree.position = groundPosition.add(new BABYLON.Vector3(0, -1, 0));
                }
            }
        }
    }
}

