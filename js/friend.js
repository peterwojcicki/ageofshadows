function Friend(position, radius, material, ground, water, rescuable) {
    this.mesh = BABYLON.MeshBuilder.CreateSphere("sphere", {segments: 10, diameter: radius * 2.0});
    this.mesh.position = position;
    this.mesh.material = material;

    this.radius = radius;
    this.ground = ground;
    this.isActive = true;
    this.rescuable = rescuable;

    this.water = water;

    this.resetDirection();
}

Friend.prototype.move = function (camera, enemyManager) {
    if (this.isActive) {

        let isFollowingEnemy = false;
        let enemies = enemyManager.getEnemies();
        for (let i = 0; i < enemies.length; i++) {
            let enemy = enemies[i];
            // captured by enemy as soon as he's within range
            if (distance3d(this.mesh.position, enemy.getPosition()) < 50) {
                this.followEnemy(enemy);
                isFollowingEnemy = true;
                break;
            }
        }

        if (!isFollowingEnemy) {
            if (this.rescuable && distance3d(this.mesh.position, camera.position) < 300) {
                // chase player
                this.followPlayer(camera);

            } else if (distance3d(this.mesh.position, this.targetPosition) < 5 * this.radius) {
                this.resetDirection();
            }
        }
        this.mesh.position.addInPlace(this.direction);
    }
}

Friend.prototype.resetDirection = function () {

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

Friend.prototype.followPlayer = function (camera) {
    this.follow(camera.position);
}

Friend.prototype.followEnemy = function (enemy) {
    this.follow(enemy.getPosition());
}


Friend.prototype.follow = function (positionToFollow) {
    let newY = this.ground.getHeightAtCoordinates(positionToFollow.x, positionToFollow.z);
    this.targetPosition = new BABYLON.Vector3(positionToFollow.x, newY + this.radius, positionToFollow.z);

    let speed = 0.6;
    this.direction = this.targetPosition.subtract(this.mesh.position).normalize().multiplyByFloats(speed, speed, speed);

    if (distance3d(this.mesh.position.add(this.direction), this.targetPosition) < 6 * this.radius) {
        this.direction = new BABYLON.Vector3(0, 0, 0);
    } else if (distance3d(this.mesh.position.add(this.direction), this.targetPosition) < 20 * this.radius) {
        let slowDownFactor = 0.5;
        this.direction = this.direction.multiplyByFloats(slowDownFactor, slowDownFactor, slowDownFactor);
    }

    // adjust the Y according to the actual step
    this.direction.y = this.ground.getHeightAtCoordinates(this.mesh.position.x + this.direction.x, this.mesh.position.z + this.direction.z) + this.radius - this.mesh.position.y;
}

Friend.prototype.isRescuable = function() {
    return this.rescuable;
}

Friend.prototype.getPosition = function() {
    return this.mesh.position;
}