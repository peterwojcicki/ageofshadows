function Enemy(position, radius, material, ground) {
    this.mesh = BABYLON.MeshBuilder.CreateSphere("sphere", {segments: 10, diameter: radius * 2.0});
    this.mesh.position = position;
    this.mesh.material = material;

    this.radius = radius;
    this.ground = ground;
    this.isActive = true;

    this.resetDirection();
}

Enemy.prototype.die = function () {
    this.isActive = false;
    this.mesh.setEnabled(false);

    new Sound(scene, "sounds/creatures/man_die_1.wav", false);
}

Enemy.prototype.hit = function (projectile) {
    if (this.isActive) {
        if (distance3d(projectile.getPosition(), this.mesh.position) <= this.radius) {
            this.die();
            projectile.deactivate();
        }
    }
}

Enemy.prototype.move = function (camera) {
    if (this.isActive) {
        if (distance3d(this.mesh.position, camera.position) < 60) {
            // chase player
            this.followPlayer(camera);
        } else if (distance3d(this.mesh.position, this.targetPosition) < 5 * this.radius) {
            this.resetDirection();
        }
        this.mesh.position.addInPlace(this.direction);
    }
}

Enemy.prototype.resetDirection = function () {
    let factor = 30.0;
    let deltaX = factor * (-1.0 + 2.0 * Math.random());
    let deltaZ = factor * (-1.0 + 2.0 * Math.random());
    let y = this.ground.getHeightAtCoordinates(this.mesh.position.x + deltaX, this.mesh.position.z + deltaZ);

    this.targetPosition = new BABYLON.Vector3(this.mesh.position.x + deltaX, y + this.radius, this.mesh.position.z + deltaZ);

    let speed = 0.1;
    this.direction = this.targetPosition.subtract(this.mesh.position).normalize().multiplyByFloats(speed, speed, speed);
}

Enemy.prototype.followPlayer = function (camera) {

    this.targetPosition = camera.position.clone();

    let speed = 0.3;
    this.direction = this.targetPosition.subtract(this.mesh.position).normalize().multiplyByFloats(speed, speed, speed);
}