import './App.css'
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene'
import Ex1 from './examples/Ex1';
import Ex2 from './examples/Ex2';

function App() {
	return <>
		{/* <Ex2></Ex2> */}
		<div className='scene'>
		<Canvas className='canvas'
			shadows
			shadow-mapsize-width={1024}
			shadow-mapsize-height={1024}
			style={{
				height:"100dvh",
				backgroundColor: "var(--color-main)"
			}}
			camera={{fov:23,near:0.05,far:400,zoom:1.0,position:[-73,60,73]}}
		>
			<Scene></Scene>
		</Canvas>
		</div>
	</>
}

export default App
