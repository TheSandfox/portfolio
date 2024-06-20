import { useGLTF } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

function SceneObject() {
	const three = useThree()
	const gltf = useGLTF('/portfolio.glb');
	console.log(gltf);
	const [scene,camera] = useMemo(() => [gltf.scene.clone(),gltf.cameras[0].clone()], [gltf.scene]);

	useEffect(()=>{
		
		three.camera.position.copy(camera.position);
		three.camera.rotation.copy(camera.rotation);
		three.camera.fov = camera.fov;

		three.camera.updateProjectionMatrix();
		scene.fog = new THREE.Fog('black', 5, 50);
		return ()=>{

		}
	},[scene,camera])

	return (
		<>
			<fog/>
			<ambientLight intensity={0.45}/>
			<primitive 
				object={scene} 
			/>
		</>
	);
}

export default function Scene() {
	return <div className='scene'>
		<Canvas className='canvas' style={{height:"640px"}}>
			<SceneObject />
		</Canvas>
	</div>
}