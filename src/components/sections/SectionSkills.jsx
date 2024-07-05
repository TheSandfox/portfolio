import { SkillContainer } from '../generic/Skill';
import SectionTitle from './SectionTitle';
import './section.css';

const SKILLS = [
	//프
	[
		[
			{
				imgPath:'/portfolio/icons/icon_html.png',
				title:'html',
				colorString:'#F06529'
			},
			{
				imgPath:'/portfolio/icons/icon_css.png',
				title:'css',
				colorString:'#2196F3'
			}
		],
		[
			{
				imgPath:'/portfolio/icons/icon_javascript.png',
				title:'javascript',
				colorString:'#FFDF00'
			},
			{
				imgPath:'/portfolio/icons/icon_jquery.png',
				title:'jquery',
				colorString:'#0868AC'
			}
		],
		[
			{
				imgPath:'/portfolio/icons/icon_react.png',
				title:'react',
				colorString:'#00D9FF'
			},
			{
				imgPath:'/portfolio/icons/icon_threejs.png',
				title:'threejs',
				colorString:'#333333'
			}
		]
	],
	//백
	[
		[
			{
				imgPath:'/portfolio/icons/icon_java.png',
				title:'java',
				colorString:'#FFFFFF'
			},
			{
				imgPath:'/portfolio/icons/icon_mysql.png',
				title:'mysql',
				colorString:'#4479A1'
			}
		],
		[
			{
				imgPath:'/portfolio/icons/icon_nodejs.png',
				title:'nodejs',
				colorString:'#339933'
			},
		]
	],
	//그
	[
		[
			{
				imgPath:'/portfolio/icons/icon_blender.png',
				title:'blender',
				colorString:'#FF8800'
			}
		],
		[
			{
				imgPath:'/portfolio/icons/icon_photoshop.png',
				title:'photoshop',
				colorString:'#00A9FF'
			},
			{
				imgPath:'/portfolio/icons/icon_illustrator.png',
				title:'illustrator',
				colorString:'#FF9A00'
			},
			{
				imgPath:'/portfolio/icons/icon_aseprite.png',
				title:'aseprite',
				colorString:'#FFFFFF'
			}
		]
	],
	//툴
	[
		[
			{
				imgPath:'/portfolio/icons/icon_git.png',
				title:'git',
				colorString:'#F05032'
			},
			{
				imgPath:'/portfolio/icons/icon_github.png',
				title:'github',
				colorString:'#181717'
			}
		],
		[
			{
				imgPath:'/portfolio/icons/icon_vscode.png',
				title:'vscode',
				colorString:'#007ACC'
			},
			{
				imgPath:'/portfolio/icons/icon_figma.png',
				title:'figma',
				colorString:'#434343'
			}
		],
		[
			{
				imgPath:'/portfolio/icons/icon_excel.png',
				title:'excel',
				colorString:'#2E7D32'
			},
			{
				imgPath:'/portfolio/icons/icon_powerpoint.png',
				title:'powerpoint',
				colorString:'#EF6C00'
			}
		],
	]
]

export default function SectionSkills({outerRef}) {
	return <>
		<section id="skills" ref={outerRef}>
			<SectionTitle>SKILLS</SectionTitle>
			<div className='contents'>
				<div className='skillsDivision'>
					<SkillContainer title={'FrontEnd'} args={SKILLS[0]}/>
				</div>
				<div className='skillsDivision'>
					<SkillContainer title={'BackEnd'} args={SKILLS[1]}/>
					<SkillContainer title={'Graphics'} args={SKILLS[2]}/>
				</div>
				<div className='skillsDivision'>
					<SkillContainer title={'Tools'} args={SKILLS[3]}/>
				</div>
			</div>
		</section>
	</>
}