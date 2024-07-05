import DashCard from '../generic/DashCard';
import SectionTitle from './SectionTitle';
import './section.css';
import { ProfileBadgeContainer } from '/src/components/generic/ProfileBadge'

const PROFILE_VALUES = [
	//이름, 생일, 위치
	[
		{
			imgPath:'/portfolio/icons/icon_user.png',
			title:'이름',
			content:'전인탁',
			colorString:'#5B51CE',
		},
		{
			imgPath:'/portfolio/icons/icon_birthday.png',
			title:'생년월일',
			content:'1994.11.29',
			colorString:'#CD442B',
		},
		{
			imgPath:'/portfolio/icons/icon_location.png',
			title:'위치',
			content:'경기도 남양주시 별내면',
			colorString:'#D07103',
		},
	],
	//전번, 이멜
	[
		{
			imgPath:'/portfolio/icons/icon_call.png',
			title:'연락처',
			content:'010-7221-3766',
			colorString:'#3D9E41',
		},
		{
			imgPath:'/portfolio/icons/icon_email.png',
			title:'이메일',
			content:'sandfox9411@gmail.com',
			colorString:'#2084D3',
		},
	]
]

export default function SectionAboutMe({outerRef}) {
	return <>
		<section id='aboutMe' ref={outerRef}>
			<SectionTitle>ABOUTME</SectionTitle>
			<ProfileBadgeContainer
				args={PROFILE_VALUES}
			/>
			<DashCard title={'이력사항&자격증'}>
				<ul>
					<li className='fontMain'> - 수택고등학교 졸업 / 2013.02</li>
					<li className='fontMain'> - (군복무사항기재) / 2015.11 ~ 2017.08</li>
					<li className='fontMain'> - 빅데이터 활용 JAVA기반 SW개발자 양성과정(중앙정보처리학원) 수료 / 2018.08</li>
					<li className='fontMain'> - SQL개발자(SQLD자격) 취득 / 2024.06</li>
					<li className='fontMain'> - 웹디자인기능사 취득 / 2024.06</li>
					<li className='fontMain'> - WebGL(3D API)을 활용한 Motion UI 프론트엔드 웹앱개발자 양성과정(그린컴퓨터아트학원) 수료 / 2024.08</li>
				</ul>
			</DashCard>
			<DashCard title={'소개'}>
				<p className='fontMain'>
					고등학생이 될 무렵 게임 개발에 관심이 생긴 것을 기점으로 프로그래밍에 입문하게 되었습니다. 
					군 전역 이후에는 JAVA기반 백엔드 어플리케이션 개발 과정을 수료하였고 3D CG분야에도 관심이 생겨서 취미로 독학하다가 
					현재 프론트엔드 개발자를 목표로 공부하면서 이전에 배웠던 언어&기술들을 전부 활용해 three.js와 react를 활용한 프론트 어플리케이션과 
					express기반의 REST API 어플리케이션을 동시에 개발&배포하는 프로젝트를 진행했습니다.
				</p>
			</DashCard>
		</section>
	</>
}