import { useState } from 'react';
import './section.css';
import { ProjectCardContainer, ProjectTabs } from '../generic/Project';

export default function SectionProjects({outerRef}) {
	const [filter,setFilter] = useState(0);
	const handleFilter = {
		set:(index)=>{
			setFilter(index);
		}
	}
	return <>
		<section id={'projects'} ref={outerRef}>
			<div className='top'>
				<ProjectTabs handleFilter={handleFilter} filter={filter}/>
			</div>
			<ProjectCardContainer filter={filter}/>
		</section>
	</>
}