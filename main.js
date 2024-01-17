import *  as THREE from 'three';
import "./style.css"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap';
//Scene
const scene= new THREE.Scene();

//creating the sphere
const geometry=new THREE.SphereGeometry(3,64,64)
const material=new THREE.MeshStandardMaterial({
    color:#ff3456
})
const mesh=new THREE.Mesh(geometry,material)
scene.add(mesh)

//Sizes 
const size={
  width:window.innerWidth,
  height:window.innerHeight,
}
//Camera
const camera=new THREE.PerspectiveCamera(45,size.width/size.height,0.1,100)
camera.position.z=20
scene.add(camera)

//Light
const light=new THREE.PointLight(0xffffff,1,100)
camera.position.set(0,10,10)
scene.add(light)

document.addEventListener('DOMContentLoaded', function() {
  // Renderer
  const canvas=document.querySelector('.webgl')
  const render=new THREE.WebGLRenderer({canvas})
  renderer.setSize(size.width,size.height)
  renderer.setPixelRatio(2)
  renderer.render(scene,camera)
});
const controls=new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan=false
controls.enableZoom=false
controls.autoRotate=true
controls.autoRotateSpeed=5


 window.addEventListener("resize",()=>{
  size.width=window.innerWidth
  size.height=window.innerHeight
  //update camera
  camera.aspect=size.width/size.height
  camera.updateProjectionMatrix()
  renderer.render(scene,camera)
 })

 const loop=()=>{
  mesh.position.x+=0.1
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
 }
 loop()


 //Timeline magickk
 const t1=gsap.timeline({
  defaults:{duration:1}
 })
 t1.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
 t1.fromTo("nav",{y:"-100%"},{y:"0%"})
 t1.fromTo(".title",{opacity:0},{opacity:1})


 //Mouse Animation Colour
 let mouseDown=false
 let rgb=[]
window.addEventListener('mousedown',()=>(mouseDown=true))
window.addEventListener('mouseup',()=>(mouseDown=false))

window.addEventListener("mousemove",(e)=>{
  if (mouseDown){
    rgb=[
      Math.round((e.pageX/size.width)*255)
      ,Math.round((e.pageY/size.width)*255),
      150,
    ]
    //lets animate
    let newColor= new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color,{
      r:newColor.r,
      g:newColor.g,
      b:newColor.b,
    })
  }
})









