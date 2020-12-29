function Enemy(position, radius, material) {
    this.mesh = BABYLON.MeshBuilder.CreateSphere("sphere", {segments: 10, diameter: radius * 2.0});
    this.mesh.position = position;
    this.mesh.material = material;

    this.radius = radius;
}

Enemy.prototype.die = function() {
    this.mesh.setEnabled(false);

    new Sound(scene, "sounds/creatures/man_die_1.wav", false);
}

Enemy.prototype.hit = function(projectile) {
    if (distance3d(projectile.getPosition(), this.mesh.position) <= this.radius) {
        this.die();
        projectile.deactivate();
    }
}