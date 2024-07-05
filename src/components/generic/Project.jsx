import { Link } from 'react-router-dom';
import './project.css';
import PROJECT_DATAS from '/src/datas/projectDatas';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../../App';

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


//프로젝트 디테일 버튼
export function ProjectDetailButton({item,onClick,to,hideTitle,className}) {
	const configuration = {
		className:`projectDetailButton${className?(' '+className):''}`,
		style:{backgroundColor:item.colorString}
	}
	const imgJSX = <>
		<img src={item.imgPath} alt={item.title}/>
		{hideTitle
			?null
			:<p className='fontMedium'>{item.title}</p>
		}
	</>
	return <>{
		to
		?<Link 
			to={to}
			target={'_blank'}
			// className={`projectDetailButton${className?(' '+className):''}`}
			// style={{backgroundColor:item.colorString}}
			{...configuration}
		>
			{imgJSX}
		</Link>
		:<div 
			onClick={onClick}
			// className={`projectDetailButton${className?(' '+className):''}`} 
			// style={{backgroundColor:item.colorString}
			{...configuration}
		>
			{imgJSX}
		</div>
	}</>
}

//프로젝트카드
export function ProjectCard({item}) {
	const [active,setActive] = useState(false);
	const { handleDetail } = useContext(AppContext);
	return <>{
		item
		?<div 
			className={`projectCard${active?' active':''}`} 
			// onClick={()=>{setActive(!active)}}
			onMouseEnter={()=>{setActive(true)}}
			onMouseLeave={()=>{setActive(false)}}
		>
			{/* 이미지영역 */}
			<div className='top'>
				<img src={item.imgPath} alt={item.title}/>
			</div>
			{/* 하단 */}
			<div className='bottom'>
				{/* 제목&설명, 호버시 컨텍스트 */}
				<div className='contents'>
					{/* 호버안함 */}
					<div className='nonHover'>
						{/* 제목&날짜 */}
						<div className='top'>
							<h4 className='fontMedium'>{item.title}</h4>
							<p className='fontMain'>{`${item.dateStart} ~ ${item.dateEnd}`}</p>
						</div>
						{/* 설명 */}
						<div className='bottom'>
							<p className='fontMain'>
								{item.description}
							</p>
						</div>
					</div>
					{/* 호버함 */}
					<div className='hover'>
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
								onClick={()=>{handleDetail.set({...item});}}
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
		:<div className='projectCard empty'>

		</div>
	}</>
		
}

export function ProjectCardContainer({filter,page,itemsPerPage,handleMaxPage}) {
	//잘려진 배열
	const items = useMemo(()=>{
		let arr1 = PROJECT_DATAS
			.filter(item=>(item.type===filter||filter===0))
			.splice(page*itemsPerPage,itemsPerPage);
		return new Array(itemsPerPage).fill(null).map((val,index)=>{
			if (arr1[index]) {
				return arr1[index];
			} else {
				return null;
			}
		})
	},[filter,page,PROJECT_DATAS,itemsPerPage]);
	//맥스페이지 계산
	const maxPageIndex = useMemo(()=>{
		let newArr = PROJECT_DATAS
			.filter(item=>(item.type===filter||filter===0));
		return Math.ceil(newArr.length/itemsPerPage) - 1
	},[PROJECT_DATAS,itemsPerPage,filter]);
	//맥스페이지 내보내기
	useEffect(()=>{
		handleMaxPage.set(maxPageIndex);
	},[maxPageIndex]);
	return <div className='projectCardContainer'>
		{items
			?items.map((item,index)=>{
				return <ProjectCard item={item} key={index}/>
			})
			:null
		}
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