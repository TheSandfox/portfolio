import './lefttab.css';

const LEFTTAB_CONTENTS = [
	{
		title:'ABOUTME',
		imgPath:'/portfolio/icons/icon_user.png'
	},
	{
		title:'SKILLS',
		imgPath:'/portfolio/icons/icon_graph.png'
	},
	{
		title:'PROJECTS',
		imgPath:'/portfolio/icons/icon_project.png'
	},
	{
		title:'CLONEPAGES',
		imgPath:'/portfolio/icons/icon_copy2.png'
	},
	{
		title:'CONTACTME',
		imgPath:'/portfolio/icons/icon_chat.png'
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
				<h2>{item.title}</h2>
				<img className={'icon'} src={item.imgPath} alt={item.title}/>
			</li>
		})}
	</ul>
}