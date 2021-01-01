function FriendManager(scene) {
    this.defaultMaterial = new BABYLON.StandardMaterial("defaultMaterial", scene);
    this.defaultMaterial.diffuseColor = new BABYLON.Color3(1, 1, 0);
    this.defaultMaterial.ambientColor = new BABYLON.Color3(1, 1, 0);
    this.defaultMaterial.specularColor = new BABYLON.Color3(1, 1, 0);

    this.mainFriendMaterial = new BABYLON.StandardMaterial("mainFriendMaterial", scene);
    this.mainFriendMaterial.diffuseColor = new BABYLON.Color3(0, 1, 1);
    this.mainFriendMaterial.ambientColor = new BABYLON.Color3(0, 1, 1);
    this.mainFriendMaterial.specularColor = new BABYLON.Color3(0, 1, 1);

    this.positions = [];
    this.positionsWithFriend = [];
    this.friends = [];
}

FriendManager.prototype.accept = function (scene, groundPosition, depth) {
    if (depth < -10 && depth > -200) {
        this.positions.push(groundPosition.add(new BABYLON.Vector3(3.0, 1.0, 3.0)));
    }
}

FriendManager.prototype.update = function (camera, ground, player, water) {

    // add the 1st rescuable friend
    if (this.friends.length == 0) {
        let positionOfRescuableFriend = this.positions[79];
        this.friends.push(new Friend(positionOfRescuableFriend, 1.0, this.mainFriendMaterial, ground, water, true));
        this.positionsWithFriend.push(positionOfRescuableFriend);
    }


    // ... and all the non-rescuable ones
    for (let i = 0; i < this.positions.length; i++) {

        let friendPosition = this.positions[i];

        if (Math.abs(camera.position.x - friendPosition.x) < 400
            && Math.abs(camera.position.z - friendPosition.z) < 400) {

            if (!this.friendExistsAtPosition(friendPosition)) {
                window.console.log("FriendManager.update - show friend at position " + friendPosition);
                this.friends.push(new Friend(friendPosition, 1.0, this.defaultMaterial, ground, water, false));
                this.positionsWithFriend.push(friendPosition);
            }
        }
    }
}

FriendManager.prototype.friendExistsAtPosition = function (position) {
    for (let i = 0; i < this.positionsWithFriend.length; i++) {
        let positionWithEnemy = this.positionsWithFriend[i];
        if ((positionWithEnemy.x == position.x) && (positionWithEnemy.z == position.z)) {
            return true;
        }
    }
    return false;
}

FriendManager.prototype.move = function (camera, enemyManager) {

    for (let i = 0; i < this.friends.length; i++) {
        let friend = this.friends[i];
        friend.move(camera, enemyManager);
    }
}

FriendManager.prototype.getFriends = function () {
    return this.friends;
}

FriendManager.prototype.getRescuableFriends = function () {
    let rescuableFriends = [];
    for (let i = 0; i < this.friends.length; i++) {
        let friend = this.friends[i];
        if (friend.isRescuable()) {
            rescuableFriends.push(friend);
        }
    }

    return rescuableFriends;
}
