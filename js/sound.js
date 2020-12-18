function Sound(scene, path, playInLoop) {
    var that = this;
    this.sound = new BABYLON.Sound("gemSound", path, scene,
        function () {
            that.sound.setVolume(1);
        }, {loop: playInLoop, autoplay: true}
    );
}