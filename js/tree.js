function Tree(scene, position, barkMaterial) {
    //leaf material
    var green = new BABYLON.StandardMaterial("green", scene);
    green.diffuseColor = new BABYLON.Color3(0, 79.0 / 255.0, 35.0 / 255.0);


    //Tree parameters
    var trunk_height = 12;
    var trunk_taper = 0.6;
    var trunk_slices = 5;
    var boughs = 2; // 1 or 2
    var forks = 3;
    var fork_angle = Math.PI / 4;
    var fork_ratio = 2 / (1 + Math.sqrt(5)); //PHI the golden ratio
    var branch_angle = Math.PI / 3;
    var bow_freq = 2;
    var bow_height = 3.5;
    var branches = 2;
    var leaves_on_branch = 3;
    var leaf_wh_ratio = 0.5;

    this.tree = createTree(trunk_height, trunk_taper, trunk_slices, barkMaterial, boughs, forks, fork_angle, fork_ratio, branches, branch_angle, bow_freq, bow_height, leaves_on_branch, leaf_wh_ratio, green, scene);
    this.tree.position = position;
}

Tree.prototype.getMesh = function (camera) {
    return this.tree;
}

Tree.prototype.hide = function () {
    this.tree.position = new BABYLON.Vector3(0, -100, 0);
}

Tree.prototype.moveTo = function (position) {
    this.tree.position = position;
}