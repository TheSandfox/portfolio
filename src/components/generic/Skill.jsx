import './skill.css';

export function SkillIcon({item}) {
	return <div className='skillIcon' title={item.title} style={{backgroundColor:item.colorString}}>
		<img src={item.imgPath} alt={item.title}/>
	</div>
}

export function SkillContainer({title,args}) {
	return <>
		<div className="skillContainer">
			<h3 className="title fontMedium">{title}</h3>
			<div className='skillRows'>
				{args.map((items,index1)=>{
					return <div className='skillRow' key={index1}>
						{items.map((item,index2)=>{
							return <SkillIcon item={item} key={index2}/>
						})}
					</div>
				})}
			</div>
		</div>
	</>
}