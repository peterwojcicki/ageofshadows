function Enemy(position, radius, defaultMaterial, alertedMaterial, ground, projectileManager, player, water) {
    this.mesh = BABYLON.MeshBuilder.CreateSphere("sphere", {segments: 10, diameter: radius * 2.0});
    this.mesh.position = position;
    this.mesh.material = defaultMaterial;

    this.defaultMaterial = defaultMaterial;
    this.alertedMaterial = alertedMaterial;

    this.radius = radius;
    this.ground = ground;
    this.projectileManager = projectileManager;
    this.active = true;

    this.lastAttactAt = 0;
    this.player = player;
    this.water = water;

    this.resetDirection();
}

Enemy.prototype.isActive = function () {
    return this.active;
}

Enemy.prototype.getPosition = function () {
    return this.mesh.position;
}

Enemy.prototype.die = function () {
    this.active = false;
    this.mesh.setEnabled(false);

    new Sound(scene, "sounds/creatures/man_die_2.wav", false);
}

Enemy.prototype.hit = function (projectile) {
    if (this.active && this != projectile.getShooter()) {
        if (distance3d(projectile.getPosition(), this.mesh.position) <= this.radius) {
            this.die();
            projectile.deactivate();

            this.player.increaseKills();
            this.player.increaseHealth();
        }
    }
}

Enemy.prototype.move = function (camera) {
    if (this.active) {
        if (distance3d(this.mesh.position, camera.position) < 100) {

            // chase player
            this.followPlayer(camera);

            // shoot at the player, but not more often than every 1 sec
            let now = Date.now();
            if (now - this.lastAttactAt > 1000) {
                this.projectileManager.shootFromTo(this.mesh.position, camera.position, this);
                this.lastAttactAt = now;
            }

        } else if (distance3d(this.mesh.position, this.targetPosition) < 5 * this.radius) {
            this.resetDirection();
        } else {
            this.mesh.material = this.defaultMaterial;
        }
        this.mesh.position.addInPlace(this.direction);
    }
}

Enemy.prototype.resetDirection = function () {

    this.mesh.material = this.defaultMaterial;

    let factor = 30.0;

    let deltaX = factor * (-1.0 + 2.0 * Math.random());
    let deltaZ = factor * (-1.0 + 2.0 * Math.random());
    let y = this.ground.getHeightAtCoordinates(this.mesh.position.x + deltaX, this.mesh.position.z + deltaZ);

    // in case it's going to be underwater, let's go in the opposite direction
    if (y <= this.water.getPosition().y) {
        deltaX = deltaX * -1.0;
        deltaZ = deltaZ * -1.0;
        y = this.ground.getHeightAtCoordinates(this.mesh.position.x + deltaX, this.mesh.position.z + deltaZ);
    }

    this.targetPosition = new BABYLON.Vector3(this.mesh.position.x + deltaX, y + this.radius, this.mesh.position.z + deltaZ);

    let speed = 0.1;
    this.direction = this.targetPosition.subtract(this.mesh.position).normalize().multiplyByFloats(speed, speed, speed);
}

Enemy.prototype.followPlayer = function (camera) {

    this.mesh.material = this.alertedMaterial;

    let enemyY = this.ground.getHeightAtCoordinates(camera.position.x, camera.position.z);
    this.targetPosition = new BABYLON.Vector3(camera.position.x, enemyY + this.radius, camera.position.z);

    let speed = 0.6;
    this.direction = this.targetPosition.subtract(this.mesh.position).normalize().multiplyByFloats(speed, speed, speed);

    this.direction.y = this.ground.getHeightAtCoordinates(this.mesh.position.x + this.direction.x, this.mesh.position.z + this.direction.z) + this.radius - this.mesh.position.y;
}