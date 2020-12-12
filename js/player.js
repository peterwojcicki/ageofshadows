function Player(scene) {
    this.underwater = false;
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