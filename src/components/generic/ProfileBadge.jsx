import './profilebadge.css';

export function ProfileBadge({item}) {
	return <>
		<div className="profileBadge" style={{backgroundColor:item.colorString}}>
			<img className='icon' src={item.imgPath} alt={item.title}/>
			<div className="right">
				<h4 className="title fontMain">{item.title}</h4>
				<p className="content fontMedium">{item.content}</p>
			</div>
		</div>
	</>
}

export function ProfileBadgeContainer({args}) {
	return <>
		<div className='profileBadgeContainer'>
			{args.map((arg,index1)=>{
				return <div className='profileBadgeRow' key={index1}>
					{arg.map((item,index2)=>{
						return <ProfileBadge
							key={index2}
							item={item}
						/>
					})}
				</div>
			})}
		</div>
	</>
}