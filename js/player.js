function Player(scene, camera) {
    this.underwater = false;
    this.camera = camera;
    this.health = 100;
}

Player.prototype.moveUp = function (camera) {
    camera.position.y += 3;
}

Player.prototype.isUnderwater = function () {
    return this.underwater;
}

Player.prototype.goUnderwater = function () {
    this.underwater = true;
}

Player.prototype.emergeFromUnderwater = function () {
    this.underwater = false;
}

Player.prototype.checkIfHit = function (projectileManager) {
    let projectiles = projectileManager.getProjectiles();
    for (let i = 0; i < projectiles.length; i++) {
        let projectile = projectiles[i];
        if (this.camera != projectile.getShooter()) {
            // if the other projectile is within 2 meters of us, it's a hit
            if (distance3d(projectile.getPosition(), this.camera.position) <= 2) {
                this.decreaseHealth();
                projectile.deactivate();

                break;
            }
        }
    }
}

Player.prototype.decreaseHealth = function () {
    new Sound(scene, "sounds/creatures/man_hit.wav", false);

    // on each hit take away 5% of life
    this.health = this.health - 5;
    if (this.health < 0) {
        this.health = 0;
    }
}

Player.prototype.getHealth = function () {
    return this.health;
}
