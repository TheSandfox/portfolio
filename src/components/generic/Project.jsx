import { Link } from 'react-router-dom';
import './project.css';

const PROJECT_TABS = [
	{
		title:'All'
	},
	{
		title:'Team'
	},
	{
		title:'Single'
	},
	{
		title:'Toy'
	},
]

import PROJECT_DATAS from '/src/datas/projectDatas';

//프로젝트 디테일 버튼
export function ProjectDetailButton({item,onClick,to,hideTitle,className}) {
	return <>{
		to
		?<Link 
			className={`projectDetailButton${className?(' '+className):''}`}
			to={to}
			target={'_blank'}
			style={{backgroundColor:item.colorString}}
		>
			<img src={item.imgPath} alt={item.title}/>
			{hideTitle
				?null
				:<p className='fontMedium'>{item.title}</p>
			}
		</Link>
		:<div 
			className={`projectDetailButton${className?(' '+className):''}`} 
			style={{backgroundColor:item.colorString}}
			onClick={onClick}
		>
			<img src={item.imgPath} alt={item.title}/>
			{hideTitle
				?null
				:<p className='fontMedium'>{item.title}</p>
			}
		</div>
	}</>
}

//프로젝트카드
export function ProjectCard({item}) {
	return <div className='projectCard'>
		<div className='top'>
			{/* 이미지영역 */}
			<img src={item.imgPath} alt={item.title}/>
		</div>
		<div className='bottom'>
			<div className='contents'>
				{/* 제목&설명, 호버시 컨텍스트 */}
				<div className='nonHover'>
					{/* 호버안함 */}
					<div className='top'>
						{/* 제목&날짜 */}
						<h4 className='fontMedium'>{item.title}</h4>
						<p className='fontMain'>{`${item.dateStart} ~ ${item.dateEnd}`}</p>
					</div>
					<div className='bottom'>
						{/* 설명 */}
						<p className='fontMain'>
							{item.description}
						</p>
					</div>
				</div>
				<div className='hover'>
					{/* 호버함 */}
					<h4 className='fontSubTitle'>
						{item.title}
					</h4>
					<div className='projectDetailButtons'>
						<ProjectDetailButton 
							item={{
								imgPath:'/portfolio/icons/icon_search.png',
								title:'자세히 보기',
								colorString:'#2E7D32'
							}}
							onClick={()=>{}}
						/>
						<ProjectDetailButton 
							item={{
								imgPath:'/portfolio/icons/icon_link.png',
								title:'사이트 바로가기',
								colorString:'#00A9FF'
							}}
							to={item.details[1]}
						/>
						<ProjectDetailButton 
							item={{
								imgPath:'/portfolio/icons/icon_github.png',
								title:'Github 바로가기',
								colorString:'#181717'
							}}
							to={item.details[2]}
						/>
					</div>
				</div>
			</div>
			{/* 태그자리 */}
			<div className='projectTags fontMain'>
				{item.tags.map((tag,index)=>{
					return <div className='projectTag' key={index}>
						{tag}
					</div>
				})}
			</div>
		</div>
	</div>
}

export function ProjectCardContainer({filter}) {
	return <div className='projectCardContainer'>
		{PROJECT_DATAS.filter(item=>(item.type===filter||filter===0)).map((item,index)=>{
			return <ProjectCard item={item} key={index}/>
		})}
	</div>
}

//프로젝트 탭
export function ProjectTab({children,onClick,active}) {
	return <div 
		className={`projectTab fontMain${active?' active':''}`} 
		onClick={onClick}
	>
		{children}
	</div>
}

export function ProjectTabs({handleFilter,filter}) {
	return <>
		<ul className='projectTabs'>
			{PROJECT_TABS.map((item,index)=>{
				return <ProjectTab 
					index={index} 
					active={parseInt(filter)===index} 
					key={index}
					onClick={()=>{
						handleFilter.set(index);
					}}
				>
					{item.title}
				</ProjectTab>
			})}
		</ul>
	</>
}