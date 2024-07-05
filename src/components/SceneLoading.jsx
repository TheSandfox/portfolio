const STYLE = {

}

export default function SceneLoading({position}) {
	return <div 
		className="sceneLoading" 
		style={{
			...STYLE,
			left:position.x,
			top:position.y
		}}
	>
	</div>
}