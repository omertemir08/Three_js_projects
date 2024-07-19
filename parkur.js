
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Daha yumuşak gölgeler için

var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 15, 10);
scene.add(directionalLight);

renderer.shadowMap.enabled = true;
directionalLight.castShadow = true;

// Zemin oluşturma
var groundGeometry = new THREE.PlaneGeometry(100, 100);
var groundMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
var ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2; // Yatay konum
ground.position.y = 0; // Yükseklik 
ground.receiveShadow = true; // Gölge alma özelliği
scene.add(ground);

// Platform oluşturma
var platformGeometry = new THREE.BoxGeometry(10, 0.5, 10);
var platformMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
var platform = new THREE.Mesh(platformGeometry, platformMaterial);
platform.position.set(0, 1, 0); // Platformu yerden 1 birim yukarıda başlatıyoruz
platform.receiveShadow = true;
scene.add(platform);

// Ambiyans ışığı
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Beyaz renkte ve %50 yoğunlukta bir ambiyans ışığı
scene.add(ambientLight);

// Yönlü ışık
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Beyaz renkte ve %50 yoğunlukta bir yönlü ışık
directionalLight.position.set(10, 15, 10); // Işık kaynağının konumu
directionalLight.castShadow = true; // Gölgelerin oluşmasını sağla
scene.add(directionalLight);

// Spot ışık
var spotLight = new THREE.SpotLight(0xffffff, 1); // Beyaz renkte ve %100 yoğunlukta bir spot ışık
spotLight.position.set(5, 10, 5); // Işık kaynağının konumu
spotLight.castShadow = true; // Gölgelerin oluşmasını sağla
scene.add(spotLight);

// Renderer ayarları
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Yumuşak gölgeler için

// Zemin malzemesi ayarları
var groundMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
ground.material = groundMaterial; // Yeni malzemeyi zemine uygula

// Pointer kontrolü
var controls = new THREE.PointerLockControls(camera, document.body);
// El modeli el kamerası elle ilgili her şey 
var handMaterial = new THREE.MeshPhongMaterial({ color: 0x0000 });
var handGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.4);
var hand = new THREE.Mesh(handGeometry, handMaterial);
var hand2 = new THREE.Mesh(handGeometry, handMaterial);
hand.position.set(-0.32 , -0.2, -0.4); 
hand2.position.set(0.29, -0.2, -0.4); 
camera.add(hand);
camera.add(hand2);
document.addEventListener('click', function () {
    controls.lock();
});

function animateHands() {
    // El sallama efekti sadece koşarken çalışacak
    if (moveForward || moveBackward || moveLeft || moveRight) {
        // El hareketi için bir döngü veya sabit adım değeri kullanabiliriz
        var handSwingAmount = 0.08; // El sallanma miktarı

        // Sol el
        hand.position.z = -0.1 + Math.sin(Date.now() * 0.005) * handSwingAmount;
        // Sağ el
        hand2.position.z = -0.1 + Math.sin(Date.now() * 0.005 + Math.PI) * handSwingAmount;
    } else {
        // Eğer koşu durmamışsa, el pozisyonları sıfırlanır
        hand.position.z = -0.1;
        hand2.position.z = -0.1;
    }
}
scene.add(controls.getObject());

var moveForward = false; // sağ gitmeyi kontrol ediyor
var moveBackward = false; // geri gitmeyi kontrol ediyor
var moveLeft = false; // sola gitmeyi kontrol ediyor
var moveRight = false; // sağa gitmeyi kontrol ediyor
var jumpRequested = false; // zıplamayı requeste alıyor
var isJumping = false; // zıplama uygulanıyor mu kontrol ediyor
var jumpVelocity = 0.25; // ne kadar kuvvetli zıplayacağımızın değeri 
var gravity = 0.01; // zıplıyınca max yükseklikten düşerkenki bizi yere çekme hızı
var verticalVelocity = 0; // yere düşerkenki hızımız
var moveSpeed = 0.1; // yürüme speedi  
var sprintMultiplier = false;

// Cube object
var cubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2); // Size of the cube
var cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color for the cube
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube); 

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
        case 32:  // Space
            if (!isJumping) {
                jumpRequested = true;
            }
            break;
        case 16: // Shift
            moveSpeed = 0.2;
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
        case 68: // D
            moveRight = false;
            break;
        case 16: // Shift
            moveSpeed = 0.1;
            break;
    }
});

var onPlatform = true;
var falling = false; // Kamera düşüyor mu kontrol eden değişken

// Platform sınırlarını kontrol et
function checkFalling() {
    var platformMinX = platform.position.x - platformGeometry.parameters.width / 2;
    var platformMaxX = platform.position.x + platformGeometry.parameters.width / 2;
    var platformMinZ = platform.position.z - platformGeometry.parameters.depth / 2;
    var platformMaxZ = platform.position.z + platformGeometry.parameters.depth / 2;

    if (camera.position.x < platformMinX || camera.position.x > platformMaxX ||
        camera.position.z < platformMinZ || camera.position.z > platformMaxZ ||
        camera.position.y < 1) { // Platformdan düştü mü kontrol et
        onPlatform = false;
        falling = true; // Düşme başladı
    } else {
        onPlatform = true;
        falling = false; // Düşme durdu
    }
}
function a(){if(camera.position.y<-2){
            resetPosition()
            }}

// Geri sayımı başlat
function startCountdown() {
    var countdown = 5; // Geri sayım süresi
    var countdownInterval = setInterval(function() {
        console.log(countdown); // Geri sayımı konsola yazdırıyoruz, bunu ekranda göstermek için değiştirebilirsiniz
        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            resetPosition();
        }
    }, 1000);
}

// Kamerayı yeniden konumlandır
function resetPosition() {
    camera.position.set(0, 1.6, 0); // Kamerayı platformun üzerine taşıyoruz
    verticalVelocity = 0; // Hızı sıfırla
    onPlatform = true;
    falling = false; // Düşmeyi durdur
}

function animate() {
    requestAnimationFrame(animate);

    if (controls.isLocked) {
        var moveDirection = new THREE.Vector3(0, 0, 0);

        if (moveForward) moveDirection.z = -moveSpeed;
        if (moveBackward) moveDirection.z = moveSpeed;
        if (moveLeft) moveDirection.x = -moveSpeed;
        if (moveRight) moveDirection.x = moveSpeed;

        moveDirection.applyQuaternion(camera.quaternion);
        moveDirection.normalize();

        var newPosition = camera.position.clone().add(moveDirection.multiplyScalar(moveSpeed));

        camera.position.x = newPosition.x;
        camera.position.z = newPosition.z;

        if (jumpRequested && !isJumping) {
            isJumping = true;
            verticalVelocity = jumpVelocity;
            jumpRequested = false;


            cube.position.copy(camera.position);
            cube.position.y += 0.2; 
        }

        if (isJumping) {
            camera.position.y += verticalVelocity;
            verticalVelocity -= gravity;

            if (camera.position.y <= 1.6) {

                isJumping = false;
            }
        }

        if (falling) {
            verticalVelocity -= gravity; // Yerçekimini uygula
            camera.position.y += verticalVelocity; // Kamerayı aşağıya doğru hareket ettir
        }

        checkFalling();
        if (!onPlatform && !falling) {
            startCountdown();
        }

        animateHands();
        renderer.render(scene, camera);
    }
}

animate();