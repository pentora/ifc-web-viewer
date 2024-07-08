let scene, camera, renderer, controls;
const container = document.getElementById('viewer-container');

function init() {
    // シーンの作成
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // カメラの設定
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // レンダラーの設定
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // コントロールの設定
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', onWindowResize, false);

    // テスト用の立方体を追加
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // ファイル入力の設定
    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', loadIFCFile, false);
}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// 初期化と描画
init();
animate();

// IFCファイルのロード関数（未実装の場合）
function loadIFCFile(event) {
    console.log('IFC file selected:', event.target.files[0]);
    // ここにIFCファイルを読み込む処理を実装
}
}