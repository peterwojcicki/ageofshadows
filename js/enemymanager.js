function EnemyManager(scene) {
    this.defaultMaterial = new BABYLON.StandardMaterial("defaultMaterial", scene);
    this.defaultMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1);
    this.defaultMaterial.ambientColor = new BABYLON.Color3(0, 0, 1);
    this.defaultMaterial.specularColor = new BABYLON.Color3(0, 0, 1);

    this.alertedMaterial = new BABYLON.StandardMaterial("alertedMaterial", scene);
    this.alertedMaterial.diffuseColor = new BABYLON.Color3(1, 0, 0);
    this.alertedMaterial.ambientColor = new BABYLON.Color3(1, 0, 0);
    this.alertedMaterial.specularColor = new BABYLON.Color3(1, 0, 0);

    this.positions = [];
    this.positionsWithEnemy = [];
    this.enemys = [];
}

EnemyManager.prototype.accept = function (scene, groundPosition, depth) {
    if (depth < -10 && depth > -200) {
        this.positions.push(groundPosition.add(new BABYLON.Vector3(0, 2.0, 0)));
    }
}

EnemyManager.prototype.update = function (camera, ground, projectileManager, player, water) {
    for (let i = 0; i < this.positions.length; i++) {

        let enemyPosition = this.positions[i];

        if (Math.abs(camera.position.x - enemyPosition.x) < 400
            && Math.abs(camera.position.z - enemyPosition.z) < 400) {

            if (!this.enemyExistsAtPosition(enemyPosition)) {
                window.console.log("EnemyManager.update - show enemy at position " + enemyPosition);
                this.enemys.push(new Enemy(enemyPosition, 2.0, this.defaultMaterial, this.alertedMaterial, ground, projectileManager, player, water));
                this.positionsWithEnemy.push(enemyPosition);
            }
        }
    }
}

EnemyManager.prototype.enemyExistsAtPosition = function (position) {
    for (let i = 0; i < this.positionsWithEnemy.length; i++) {
        let positionWithEnemy = this.positionsWithEnemy[i];
        if ((positionWithEnemy.x == position.x) && (positionWithEnemy.z == position.z)) {
            return true;
        }
    }
    return false;
}

EnemyManager.prototype.checkIfHit = function (projectileManager, camera) {

    let projectiles = projectileManager.getProjectiles();

    for (let i = 0; i < this.enemys.length; i++) {
        let enemy = this.enemys[i];

        enemy.move(camera);

        for (let j = 0; j < projectiles.length; j++) {
            enemy.hit(projectiles[j]);
        }
    }
}
