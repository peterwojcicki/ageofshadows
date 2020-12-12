function Sound(scene, path) {
    var that = this;
    this.sound = new BABYLON.Sound("gemSound", path, scene,
        function () {
            that.sound.setVolume(1);
        }, {loop: false, autoplay: true}
    );

    //this.sound.play();
}