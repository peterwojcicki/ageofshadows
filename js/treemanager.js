function TreeManager() {
    //trunk and branch material
    this.barkMaterial = new BABYLON.StandardMaterial("bark", scene);
    this.barkMaterial.emissiveTexture = new BABYLON.Texture("img/bark.jpg", scene);
    this.barkMaterial.diffuseTexture = new BABYLON.Texture("img/bark.jpg", scene);
    this.barkMaterial.diffuseTexture.uScale = 2.0;//Repeat 5 times on the Vertical Axes
    this.barkMaterial.diffuseTexture.vScale = 2.0;//Repeat 5 times on the Horizontal Axes
    this.barkMaterial.specularColor = new BABYLON.Color3(0, 0, 0);


    this.distanceBetweenWoods = 500;
    this.woods = [];
    for (let x = -4900; x < 4900; x++) {
        for (let z = -4900; z < 4900; z++) {
            if ((x % this.distanceBetweenWoods == 0) && (z % this.distanceBetweenWoods == 0))
                this.woods.push({
                    position: new BABYLON.Vector3(x, 0, z),
                    radius: this.distanceBetweenWoods * Math.random()
                });
        }
    }


    this.visibleWoodIndex = -1;

    this.positions = [];
    this.trees = [];
    for (let i = 0; i < 100; i++) {
        this.trees.push(new Tree(scene, new BABYLON.Vector3(0, -100, 0), this.barkMaterial));
    }
}

TreeManager.prototype.accept = function (scene, groundPosition, depth) {
    if (depth < -10) {
        this.positions.push(groundPosition.add(new BABYLON.Vector3(0, -1, 0)));
    }
}

TreeManager.prototype.showWood = function (wood) {
    let woodPosition = wood.position;
    let treeIndex = 0;
    for (let i = 0; i < this.positions.length; i++) {
        let currentPosition = this.positions[i];
        if (Math.abs(currentPosition.x - woodPosition.x) < wood.radius
            && Math.abs(currentPosition.z - woodPosition.z) < wood.radius) {
            this.trees[treeIndex].moveTo(currentPosition.clone());

            window.console.log("Placing tree at " + currentPosition);

            treeIndex++;

            // we've run out of trees
            if (treeIndex == this.trees.length) {
                break;
            }
        }
    }
}

TreeManager.prototype.hideAllTrees = function () {
    for (let i = 0; i < this.trees.length; i++) {
        this.trees[i].hide();
    }
}

TreeManager.prototype.update = function (camera) {
    for (let i = 0; i < this.woods.length; i++) {
        let wood = this.woods[i];
        let woodPosition = wood.position;

        if ((Math.abs(camera.position.x - woodPosition.x) < (this.distanceBetweenWoods / 2))
            && (Math.abs(camera.position.z - woodPosition.z) < (this.distanceBetweenWoods / 2))) {
            if (i != this.visibleWoodIndex) {

                window.console.log("TreeManager.update - show wood at index " + i);

                this.hideAllTrees();
                this.visibleWoodIndex = i;
                this.showWood(wood);

                break;
            }
        }
    }
}
