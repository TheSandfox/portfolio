import { useEffect, useState } from 'react';
import './section.css';
import { ProjectCardContainer, ProjectTabs } from '../generic/Project';

export default function SectionProjects({outerRef}) {
	const [itemsPerPage,setItemsPerPage] = useState(12);
	const [filter,setFilter] = useState(0);
	const [page,setPage] = useState(0);
	const [maxPage,setMaxPage] = useState(0);
	const handleFilter = {
		set:(index)=>{
			setFilter(index);
		}
	}
	const handleMaxPage = {
		set:(index)=>{
			setMaxPage(index);
		}
	}
	useEffect(()=>{
		setPage(0);
	},[filter]);
	return <>
		<section id={'projects'} ref={outerRef}>
			<div className='top'>
				{/* 탭 필터 */}
				<ProjectTabs handleFilter={handleFilter} filter={filter}/>
				{/* 페이지네이션 */}
				<div className='projectPagination'>
					<div className='button prev'>
						<img 
							className='icon'
							src='/portfolio/icons/icon_arrowleft.png'
							alt='이전 페이지'
						/>
					</div>
					<p className='fontMain'>
						{
							maxPage<0
							?'- / -'
							:<>{page+1} / {maxPage+1}</>
						}
					</p>
					<div className='button prev'>
					<img 
							className='icon'
							src='/portfolio/icons/icon_arrowright.png'
							alt='다음 페이지'
						/>
					</div>
				</div>
			</div>
			<ProjectCardContainer 
				filter={filter} 
				page={page} 
				itemsPerPage={itemsPerPage}
				handleMaxPage={handleMaxPage}
			/>
		</section>
	</>
}