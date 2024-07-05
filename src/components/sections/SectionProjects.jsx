import { useContext, useEffect, useState } from 'react';
import './section.css';
import { ProjectCardContainer, ProjectTabs } from '../generic/Project';
import SectionTitle from './SectionTitle';
import * as BreakPoint from '/src/datas/breakpoint';
import {AppContext} from '/src/App';

export default function SectionProjects({outerRef}) {
	const { breakPoint } = useContext(AppContext);
	// console.log = useContext(AppContext);
	const [itemsPerPage,setItemsPerPage] = useState(4);
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
	const handlePage = {
		decrease:()=>{if(page>0){
			setPage(page-1)
		}},
		increase:()=>{if(page<maxPage){
			setPage(page+1)
		}}
	}
	// 페이지 재계산
	useEffect(()=>{
		setPage(0);
	},[filter,itemsPerPage]);
	// 브레이크포인트에 따른 표시갯수
	useEffect(()=>{
		setItemsPerPage(BreakPoint.projectItems[breakPoint]);
	},[breakPoint]);
	return <>
		<section id={'projects'} ref={outerRef}>
			<SectionTitle>PROJECTS</SectionTitle>
			<div className='contents'>
				<div className='top'>
					{/* 탭 필터 */}
					<ProjectTabs handleFilter={handleFilter} filter={filter}/>
					{/* 페이지네이션 */}
					<div className='projectPagination'>
					 <div className='button prevnext' onClick={()=>{handlePage.decrease()}}>
							<img 
								className='icon'
								src='/portfolio/icons/icon_arrowleft.png'
								alt='이전 페이지'
							/>
						</div>
						<p className='fontMain'>
							{
								maxPage<0
								?'-'
								:<>{page+1}</>
							}
						</p>
						<div className='button next' onClick={()=>{handlePage.increase()}}>
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
			</div>
		</section>
	</>
}