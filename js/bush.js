function Bush(position, radius, material) {
    this.mesh = BABYLON.MeshBuilder.CreateSphere("sphere", {segments: 5, diameter: radius * 2.0});
    this.mesh.position = position;
    this.mesh.material = material;

    // Furify the sphere to create the high level fur effect
    // The first argument is sphere itself. The second represents
    // the quality of the effect
    var quality = 30;
    var shells = BABYLON.FurMaterial.FurifyMesh(this.mesh, quality);
}

