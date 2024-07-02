import './lefttab.css';

const LEFTTAB_CONTENTS = [
	{
		title:'ABOUTME'
	},
	{
		title:'SKILLS'
	},
	{
		title:'PROJECTS'
	},
	{
		title:'CLONEPAGES'
	},
	{
		title:'CONTACTME'
	},
]

export default function LeftTabContainer({scrollFunc,sectionIndex}) {
	return <ul className='leftTabContainer'>
		{LEFTTAB_CONTENTS.map((item,index)=>{
			return <li 
				className={`leftTab fontTitle${parseInt(sectionIndex)===parseInt(index)?' active':''}`} 
				key={index} 
				onClick={()=>{
					scrollFunc(index);
				}}
			>
				{item.title}
			</li>
		})}
	</ul>
}