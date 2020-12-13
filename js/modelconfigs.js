function ModelConfig() {

    // the hut has a ground around it
    this.hutConfig = {
        folder: "models/hut/",
        file: "House.obj",
        scaling: 0.001,
        offsetY: -0.001
    };

    this.wellConfig = {
        folder: "models/well/",
        file: "Poco.obj",
        scaling: 0.002,
        offsetY: 0
    };

    this.church1Config = {
        folder: "models/kosciol/",
        file: "kosciol.obj",
        scaling: 0.1,
        offsetY: 0.8
    };

    this.church2Config = {
        folder: "models/church/",
        file: "3DS_Church_Redafvir.obj",
        scaling: 0.01,
        offsetY: 0
    };

    this.woodenCabinConfig = {
        folder: "models/wooden_cabin/",
        file: "WoodenCabinObj.obj",
        scaling: 0.007,
        offsetY: 0
    };

    this.watchtowerConfig = {
        folder: "models/watchtower/",
        file: "saintriqT3DS.obj",
        scaling: 0.2,
        offsetY: 0
    };

    this.houseConfig = {
        folder: "models/house/",
        file: "house_obj.obj",
        scaling: 0.0015,
        offsetY: 0
    };

    this.chapelConfig = {
        folder: "models/chapel/",
        file: "chapel_obj.obj",
        scaling: 0.0015,
        offsetY: 0
    };

    this.windmillConfig = {
        folder: "models/windmill/",
        file: "windmill.obj",
        scaling: 0.0015,
        offsetY: 0
    };

    this.bambooConfig = {
        folder: "models/bamboo/",
        file: "Bamboo.obj",
        scaling: 0.02,
        offsetY: 0
    };


}

ModelConfig.prototype.getHutDefinition = function () {
    return this.hutConfig;
}


ModelConfig.prototype.getWellDefinition = function () {
    return this.wellConfig;
}


ModelConfig.prototype.getChurch1Definition = function () {
    return this.church1Config;
}


ModelConfig.prototype.getChurch2Definition = function () {
    return this.church2Config;
}

ModelConfig.prototype.getWoodenCabinDefinition = function () {
    return this.woodenCabinConfig;
}

ModelConfig.prototype.getWatchtowerDefinition = function () {
    return this.watchtowerConfig;
}

ModelConfig.prototype.getHouseDefinition = function () {
    return this.houseConfig;
}

ModelConfig.prototype.getChapelDefinition = function () {
    return this.chapelConfig;
}

ModelConfig.prototype.getWindmillDefinition = function () {
    return this.windmillConfig;
}

ModelConfig.prototype.getBambooDefinition = function () {
    return this.bambooConfig;
}


