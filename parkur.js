/* Harflerin key code karşılığı 
w = 87
s = 83
a = 65
d= 68
space= 32

*/
// 3D sahne oluşturuluyor
var scene = new THREE.Scene();

// Kamera oluşturuluyor
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 0); // Kamerayı zeminden başlatıyoruz  



var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 15, 10);
scene.add(directionalLight);


renderer.shadowMap.enabled = true;
directionalLight.castShadow = true;

// Zeminin rengi büyüklüğü gibi herşey 
var groundGeometry = new THREE.PlaneGeometry(100, 100);
var groundMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Yatay konum
ground.position.y = 0; // Yükseklik 
ground.receiveShadow = true; 
scene.add(ground);

// pointerı three den çekiyoruz kamera için gerekli 
var controls = new THREE.PointerLockControls(camera, document.body);
// el modeli el kamerası elle ilgili herşey 
var handMaterial = new THREE.MeshPhongMaterial({ color: 0x0000 });
var handGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.4);
var hand = new THREE.Mesh(handGeometry, handMaterial);
var hand2 = new THREE.Mesh(handGeometry, handMaterial);
hand.position.set(-0.4, -0.2, -0.4); 
hand2.position.set(0.4, -0.2, -0.4); 
camera.add(hand);
camera.add(hand2)
document.addEventListener('click', function () {
    controls.lock();
});

scene.add(controls.getObject());


var moveForward = false; //sağ gitmeyi kontrol ediyo d ye basınca true döndürcek
var moveBackward = false; //sağ gitmeyi kontrol ediyo d ye basınca true döndürcek
var moveLeft = false; //sağ gitmeyi kontrol ediyo d ye basınca true döndürcek
var moveRight = false; // sağ gitmeyi kontrol ediyo d ye basınca true döndürcek
var jumpRequested = false; // zıplamayı requeste alıyo
var isJumping = false; // zıplama uygulanıyomu kontrol ediyor
var jumpVelocity = 0.25; // ne kadar kuvetli zıplayacağımızın değeri 
var gravity = 0.01; // zıplıyınca max yükseklikten düşerkenki bizi yere çekme hızı
var verticalVelocity = 0; // Yere düşerkenki hızımız 

document.addEventListener('keydown', function (event) {
    switch (event.keyCode) {
        case 87: // W 
            moveForward = true;
            break;
        case 83: // S 
            moveBackward = true;
            break;
        case 65: // A 
            moveLeft = true;
            break;
        case 68: // D
            moveRight = true;
            break;
        case 32:  //space
            if (!isJumping) {
                jumpRequested = true;
            }
            break;
    }
});

document.addEventListener('keyup', function (event) {
    switch (event.keyCode) {
        case 87: // W 
            moveForward = false;
            break;
        case 83: // S 
            moveBackward = false;
            break;
        case 65: // A 
            moveLeft = false;
            break;
        case 68: //D
            moveRight = false;
            break;
    }
});


function animate() {
    requestAnimationFrame(animate);


    if (controls.isLocked) {
     
        var moveSpeed = 0.1; // yürüme hızı kameranın birsonraki yerini hesaplama için kullanılıyor

    
        var moveDirection = new THREE.Vector3(0, 0, 0);    // Hareket vektörü oluştur


              // burdada  z-x indksini değiştiriyo (yatay enlem) 
        if (moveForward) moveDirection.z = -1;
        if (moveBackward) moveDirection.z = 1;
        if (moveLeft) moveDirection.x = -1;
        if (moveRight) moveDirection.x = 1;


        // camerayla hareketi senkranoze ediyor
        moveDirection.applyQuaternion(camera.quaternion);
        moveDirection.normalize(); 

        // camreanın yeni yerini buluyor
        var newPosition = camera.position.clone().add(moveDirection.multiplyScalar(moveSpeed));

       //camerea indeksini değiştiryor
        camera.position.x = newPosition.x;
        camera.position.z = newPosition.z;

        // Zıplama kontrolü
        if (jumpRequested && !isJumping) {
            isJumping = true;
            verticalVelocity = jumpVelocity;
              jumpRequested = false;
        }

        // Yerçekimi etkisi
        if (isJumping) {
            camera.position.y += verticalVelocity;
            verticalVelocity -= gravity;

            // Yerden aşağı düşerken kontrol
            if (camera.position.y <= 1.6) {
                camera.position.y = 1.6; // Zeminden aşşağı düşürmüyo burda 
                isJumping = false;// düşüş bitince jumpingi false yapıyo
             
            }
        }
    }

    renderer.render(scene, camera); // kamerayı renderlıyoruz
}

animate();