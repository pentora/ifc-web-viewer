async function loadIFCFile(event) {
    const file = event.target.files[0];
    const ifcLoader = new WebIFC.IFCLoader();
    await ifcLoader.ifcManager.setWasmPath("https://unpkg.com/web-ifc/");

    ifcLoader.load(file, (ifcModel) => {
        scene.add(ifcModel);
        const box = new THREE.Box3().setFromObject(ifcModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.copy(center);
        camera.position.x += maxDim / 2;
        camera.position.y += maxDim / 4;
        camera.position.z += maxDim;
        camera.lookAt(center);

        controls.target.copy(center);
    });
}