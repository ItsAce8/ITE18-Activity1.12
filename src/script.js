import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Fonts
 */
const fontLoader = new FontLoader()
const donuts = []
const cones = []

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    // (font) =>
    // {
    //     console.log('loaded')
    // }
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'Hello Three.js',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        // textGeometry.computeBoundingBox()
        // console.log(textGeometry.boundingBox)

        // textGeometry.translate(
        //     - textGeometry.boundingBox.max.x * 0.5,
        //     - textGeometry.boundingBox.max.y * 0.5,
        //     - textGeometry.boundingBox.max.z * 0.5
        // )

        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5
        // )

        textGeometry.center()

        //const textMaterial = new THREE.MeshBasicMaterial()
        //const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true })
        // const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        // const text = new THREE.Mesh(textGeometry, textMaterial)
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        //const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

        for(let i = 0; i < 100; i++)
        {
            //const donut = new THREE.Mesh(donutGeometry, donutMaterial)
            const donut = new THREE.Mesh(donutGeometry, material)

            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            donuts.push(donut)

            scene.add(donut)
        }
        const coneGeometry = new THREE.ConeGeometry(0.3, 0.6, 32)

        for(let i = 0; i < 50; i++)
        {
            const cone = new THREE.Mesh(coneGeometry, material)

            cone.position.x = (Math.random() - 0.5) * 10
            cone.position.y = (Math.random() - 0.5) * 10
            cone.position.z = (Math.random() - 0.5) * 10

            cone.rotation.x = Math.random() * Math.PI
            cone.rotation.y = Math.random() * Math.PI

            const scale = Math.random()
            cone.scale.set(scale, scale, scale)

            cones.push(cone)

            scene.add(cone)
        }
    }
)

/**
 * Base
 */
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')

/**
 * Object
 */
// const torus = new THREE.Mesh(
//     new THREE.TorusGeometry(0.4, 0.2, 16, 100),
//     new THREE.MeshBasicMaterial({ color: 0x87ceeb })
// )

//scene.add(torus)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    donuts.forEach((donut) =>
    {
        donut.position.y -= 0.01
    })

    cones.forEach((cone) =>
    {
        cone.position.y -= 0.01

        if(cone.position.y < -5)
        {
            cone.position.y = 5
        }
    })

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()