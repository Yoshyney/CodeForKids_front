import * as test from './OrbitControls.js';

			class Canvas {

				#type // String : Edit / Create
				#camera // THREE.PerspectiveCamera : Actual Camera
				#scene // THREE.Scene : Actual Scene
				#renderer // THREE.WebGLRenderer
				#isShiftDown = false // Boolean : Checker who see if a touch is pressed
				#raycaster // THREE.Raycaster() : 
				#plane // 
				#pointer // THREE.Vector2
				#cubeGeo
				#cubeMaterial
				#finishGeo
				#finishMaterial
				#finish
				#playerGeo
				#playerMaterial
				#player
				#objects = []
				#rollOverMaterial
				#rollOverMesh
				#x = 0;
				#y = 0;
				#xSpeed = 50;
				#ySpeed = 50;
				#cubeEdge;
				#playerEdge;
				#finishLine;
				#startingLine;

				init = () => {
					console.log(this)
					this.#camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
					this.#camera.position.set( 500, 800, 1300 );
					this.#camera.lookAt( 0, 0, 0 );

					this.#scene = new THREE.Scene();
					this.#scene.background = new THREE.Color( 0xf0f0f0 );

					// roll-over helpers

					const rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 );
					this.#rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } );
					this.#rollOverMesh = new THREE.Mesh( rollOverGeo, this.#rollOverMaterial );
					this.#scene.add( this.#rollOverMesh );

					// cubes

					this.#cubeGeo = new THREE.BoxGeometry( 50, 50, 50 );
					this.#cubeEdge = new THREE.EdgesGeometry( this.#cubeGeo );
					this.#cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xfeb74c, map: new THREE.TextureLoader().load( 'textures/block.png' ) } );

					// player

					this.#playerGeo = new THREE.BoxGeometry( 50, 50, 50 );
					this.#playerEdge = new THREE.EdgesGeometry( this.#playerGeo );
					this.#playerMaterial = new THREE.MeshLambertMaterial( { color: 0xfeb74c, map: new THREE.TextureLoader().load( 'textures/square-outline-textured.png' ) } );

					//finish line

					this.#finishGeo = new THREE.BoxGeometry( 50, 50, 50 );
					this.#finishMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 , opacity: 0.5, transparent: true } );

					// grid

					const gridHelper = new THREE.GridHelper( 1000, 20, 0x0000ff, 0xff0000 );
					this.#scene.add( gridHelper );

					this.#raycaster = new THREE.Raycaster();
					this.#pointer = new THREE.Vector2();
	
					const geometry = new THREE.PlaneGeometry( 1000, 1000 );
					geometry.rotateX( - Math.PI / 2 );
	
					this.#plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
					this.#scene.add( this.#plane );
					this.#objects.push( this.#plane );

					// lights
	
					const ambientLight = new THREE.AmbientLight( 0x606060 );
					this.#scene.add( ambientLight );
	
					const directionalLight = new THREE.DirectionalLight( 0xffffff );
					directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
					this.#scene.add( directionalLight );
	
					this.#renderer = new THREE.WebGLRenderer( { antialias: true } );
					this.#renderer.setPixelRatio( window.devicePixelRatio );
                    let game = document.getElementById('game');
					this.#renderer.setSize( game.innerWidth, game.innerHeight );
					game.appendChild( this.#renderer.domElement );
	
					const controls = new THREE.OrbitControls( this.#camera, this.#renderer.domElement );
					controls.target.set( 0, 0.5, 0 );
					controls.update();
					controls.enablePan = false;
					controls.enableDamping = true;
					this.#initEvent();
				}

				#initEvent = () => {
					this.#initfinish();
					this.#initplayer();
					document.addEventListener( 'pointermove', this.#onPointerMove );
					document.addEventListener( 'pointerdown', this.#onPointerDown );
					document.addEventListener( 'keydown', this.#onDocumentKeyDown );
					document.addEventListener( 'keyup', this.#onDocumentKeyUp );
					window.addEventListener( 'resize', this.#onWindowResize );
					document.addEventListener( 'keydown', this.#onKeyDown );
				}

				#initplayer = () => {
					this.#player = new THREE.Mesh( this.#playerGeo, this.#playerMaterial );
					this.#player.position.set(0,0,0);
					this.#startingLine = this.#player.position.set(0,0,0);
					this.#player.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
					this.#scene.add( this.#player );
					this.#objects.push( this.#player );
					this.#render();
				}

				#initfinish = () => {
					this.#finish = new THREE.Mesh( this.#finishGeo, this.#finishMaterial );
					this.#finish.position.set(250,0,0);
					this.#finishLine = this.#finish.position;
					this.#finish.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
					this.#scene.add( this.#finish );
					this.#objects.push( this.#finish );
					this.#render();
				}

				#onKeyDown = (event) => {
					var keyCode = event.which;
					
					if (keyCode == 32) {
						this.#player.position.set(0, 0, 0);
					} else if (keyCode == 83 && this.#y <= 400) {
						this.#player.position.z += this.#ySpeed;
						this.#y = this.#y+this.#ySpeed;
					} else if (keyCode == 90 && this.#y >= -450) {
						this.#player.position.z -= this.#ySpeed;
						this.#y = this.#y-this.#ySpeed;
					} else if (keyCode == 81 && this.#x >= -450) {
						this.#player.position.x -= this.#xSpeed;
						this.#x = this.#x-this.#xSpeed;
					} else if (keyCode == 68 && this.#x <= 400) {
						this.#player.position.x += this.#xSpeed;
						this.#x = this.#x+this.#xSpeed;
					}

					// console.log(this.#finishLine);
					// console.log(this.#startingLine);

					if (this.#finish.position.x == this.#player.position.x && this.#finish.position.z == this.#player.position.z) {
						console.log("you win !!");
					}
					this.#render();
				}

				#onPointerMove = (event) => {
					this.#pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1 );
					this.#raycaster.setFromCamera( this.#pointer, this.#camera );
					const intersects = this.#raycaster.intersectObjects( this.#objects );
					if ( intersects.length > 0 ) {
						const intersect = intersects[ 0 ];
						this.#rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
						this.#rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
					}
					this.#render();
				}

				#onPointerDown = (event) => {
					this.#pointer.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
					this.#raycaster.setFromCamera( this.#pointer, this.#camera );
					const intersects = this.#raycaster.intersectObjects( this.#objects );
					if ( intersects.length > 0 ) {
						const intersect = intersects[ 0 ];
						// delete cube
						if ( this.#isShiftDown ) {
							if ( intersect.object !== this.#plane ) {
								this.#scene.remove( intersect.object );
								this.#objects.splice( this.#objects.indexOf( intersect.object ), 1 );
							}
							// create cube
						} else {
							const voxel = new THREE.Mesh( this.#cubeGeo, this.#cubeMaterial );
							voxel.position.copy( intersect.point ).add( intersect.face.normal );
							voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
							this.#scene.add( voxel );
							this.#objects.push( voxel );
						}
						this.#render();
					}
				}

				#onWindowResize = () => {
					this.#camera.aspect = window.innerWidth / window.innerHeight;
					this.#camera.updateProjectionMatrix();
					this.#renderer.setSize( window.innerWidth, window.innerHeight );
				}

				#onDocumentKeyUp = (event) => {
					switch ( event.keyCode ) {
						case 16: this.#isShiftDown = false; break;
					}
				}

				#onDocumentKeyDown = (event) => {
					//console.log(event.keyCode)
					switch ( event.keyCode ) {
						case 16: this.#isShiftDown = true; break;
					}
				}

				#render = () => {
					this.#renderer.render( this.#scene, this.#camera );
				}
			}

			let a = new Canvas()
			a.init()

			// object :
			//	- Start : THREE.Mesh
			//	- end : THREE.Mesh
			//  - object : THREE.Mesh