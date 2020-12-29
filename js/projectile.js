function Projectile(position, radius, material, direction) {
    this.mesh = BABYLON.MeshBuilder.CreateSphere("projectile", {segments: 5, diameter: radius * 2.0});
    this.mesh.position = position;
    this.mesh.material = material;

    this.radius = radius;
    this.direction = direction;
    this.active = true;
    this.initialPosition = position.clone();
    this.range = 300;
}

Projectile.prototype.move = function () {
    if (this.active) {
        this.mesh.position.addInPlace(this.direction);

        if (distance3d(this.initialPosition, this.mesh.position) > this.range) {
            this.deactivate();
        }
    }
}

Projectile.prototype.deactivate = function () {
    this.active = false;
    this.mesh.setEnabled(false);
}

Projectile.prototype.isActive = function () {
    return this.active;
}

Projectile.prototype.getPosition = function () {
    return this.mesh.position;
}