window.addEventListener("load", init);

function init() {
  const width = 700;
  const height = 700;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas")
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(
    45,
    width / height,
    1,
    10000
  );
  camera.position.set(0, 0, 1000);

  // カメラコントローラーを作成
  const controls = new THREE.OrbitControls(camera);

  // 線
  var lines = new THREE.Group();
  const material = new THREE.LineBasicMaterial( { color: 0xfffacd } );

  var r = 300;
  var degreeInc = 0.009;
  var degree = 0;
  for (var i=0; i<40000; i++) {
    var points = [];
    var rad = degree * Math.PI / 180;
    var x = r * Math.cos(rad);
    var y = r * Math.sin(rad);
    points.push(new THREE.Vector3( 0, 0, 0 ));
    points.push(new THREE.Vector3( x, y, 0 ));
    degree += degreeInc;

    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var line = new THREE.Line( geometry, material );
    lines.add(line);
  }
  scene.add(lines);

  // 平行光源
  const light = new THREE.DirectionalLight(0xffffff);
  light.intensity = 2; // 光の強さを倍に
  light.position.set(1, 1, 1);
  // シーンに追加
  scene.add(light);

  // 初回実行
  tick();

  function tick() {
    requestAnimationFrame(tick);

    // 箱を回転させる
    // box.rotation.x += 0.01;
    // box.rotation.y += 0.01;

    controls.update();

    // レンダリング
    renderer.render(scene, camera);
  }
}
