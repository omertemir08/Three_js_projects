


    import * as THREE from "three";
    import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
    // 导入轨道控制器
    import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

    export default {
        name: "Model",
        data() {
            return {
                scene: null,
                camera: null,
                renderer: null,
                control: null,
                model: null,
            };
        },
        methods: {
            // 场景
            initScene() {
                this.scene = new THREE.Scene();
            },
            // 相机
            initCamera() {

                this.camera = new THREE.PerspectiveCamera(
                    50, // 视角(物体大小)
                    window.innerWidth / window.innerHeight, // 宽高比
                    0.01, // 近平面
                    1000 // 远平面
                );
                // 设置相机位置
                this.camera.position.x = 0.02;
                this.camera.position.y = 5;
                this.camera.position.z = 10;
                // this.camera.lookAt(0, 0, 0);
            },
            // 渲染器
            initRenderer() {
                // 创建渲染器
                this.renderer = new THREE.WebGLRenderer({antialias: true});
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.$refs.container.appendChild(this.renderer.domElement);
            },
            //光源
            initLight() {
                const light = new THREE.AmbientLight(0xffffff, 1);
                this.scene.add(light);
            },
            // 轨道控制器
            initControl() {
                this.control = new OrbitControls(this.camera, this.renderer.domElement);
                // 设置阻尼
                this.control.enableDamping = true;
                this.control.dampingFactor = 0.05;
                // 自动旋转
                this.control.autoRotate = true;
                this.control.autoRotateSpeed = 2.0;
            },
            // 模型
            initModel() {
                let _this = this;

                const loader = new GLTFLoader();
                loader.load(
                    "a.glb",
                    (glb) => {
                        console.log(glb);
                        _this.model = glb.scene;
                        _this.scene.add(_this.model);
                    },
                    function (xhr) {
                        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
                    },
                    function (error) {
                        console.log("An error happened:", error);
                    }
                );
            },

            init() {
                // 场景
                this.initScene();
                // 相机
                this.initCamera();
                // 渲染器
                this.initRenderer();
                //光源
                this.initLight();
                // 轨道控制器
                this.initControl();
                // 模型
                this.initModel();
            },

            animate() {
                requestAnimationFrame(() => {
                    this.animate();
                });
                this.renderer.render(this.scene, this.camera);
            },
        },
        mounted() {
            this.init();

            this.animate();

            // 监听窗口变化
            window.addEventListener("resize", () => {
                // 重置渲染器宽高比
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                // 重置相机宽高比
                this.camera.aspect = window.innerWidth / window.innerHeight;
                // 更新相机投影矩阵
                this.camera.updateProjectionMatrix();
            });
        },
    };
