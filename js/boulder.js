function Boulder(position, radius, material) {
    this.mesh = BABYLON.MeshBuilder.CreateSphere("sphere", {segments: 5, diameter: radius * 2.0});
    this.mesh.position = position;
    this.mesh.material = material;
}

