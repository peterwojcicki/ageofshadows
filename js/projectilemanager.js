function ProjectileManager(scene) {
    this.defaultMaterial = new BABYLON.StandardMaterial("projectile", scene);
    this.defaultMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    this.defaultMaterial.ambientColor = new BABYLON.Color3(0, 0, 0);
    this.defaultMaterial.specularColor = new BABYLON.Color3(0, 0, 0);

    this.projectiles = [];
}

ProjectileManager.prototype.shoot = function (camera) {
    let cameraDirection = BABYLON.Ray.CreateNewFromTo(camera.position, camera.getTarget()).direction;

    let speed = 3.0;
    let normalisedDirection = cameraDirection.normalizeToNew().multiplyByFloats(speed, speed, speed);
    this.projectiles.push(new Projectile(camera.position.clone(), 0.1, this.defaultMaterial, normalisedDirection));

    new Sound(scene, "sounds/weapons/arrow.wav", false);
}

ProjectileManager.prototype.update = function () {
    for (let i = 0; i < this.projectiles.length; i++) {
        let projectile = this.projectiles[i];
        projectile.move();
    }
}

ProjectileManager.prototype.getProjectiles = function () {
    return this.projectiles;
}

ProjectileManager.prototype.refreshProjectiles = function () {
    let activeProjectiles = [];

    for (let i = 0; i < this.projectiles.length; i++) {
        let projectile = this.projectiles[i];

        if (projectile.isActive()) {
            activeProjectiles.push(projectile);
        }
    }

    this.projectiles = activeProjectiles;
}

