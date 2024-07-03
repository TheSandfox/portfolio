import DashCard from '/src/components/generic/DashCard';
import './section.css';
import { ContactIcon, ContactCopy } from '../generic/Contact';

export default function SectionContactMe({outerRef,handleSystemAlert}) {
	return <>
		<section id={'contactMe'} ref={outerRef}>
			<DashCard 
				title={'Tel.'}
				iconLeft={<ContactIcon item={{
					imgPath:'/portfolio/icons/icon_call.png',
					title:'전화번호',
					colorString:'#4CAF50'
				}}/>}
				iconRight={<ContactCopy stringVal={'01072213766'} handleSystemAlert={handleSystemAlert}/>}
			>
				<p className='fontMedium'>
				전인탁: 010-7221-3766 (+821072213766)
				</p>
			</DashCard>
			<DashCard 
				title={'KakaoTalk'}
				iconLeft={<ContactIcon item={{
					imgPath:'/portfolio/icons/icon_kakao.png',
					title:'카카오톡',
					colorString:'#FFEB3B'
				}}/>}
				iconRight={<ContactCopy stringVal={''} handleSystemAlert={handleSystemAlert}/>}
			>
				<p className='fontMedium'>
				(오픈카톡링크넣기)
				</p>
			</DashCard>
			<DashCard 
				title={'Discord'}
				iconLeft={<ContactIcon item={{
					imgPath:'/portfolio/icons/icon_discord.png',
					title:'디스코드',
					colorString:'#5C6BC0'
				}}/>}
				iconRight={<ContactCopy stringVal={''} handleSystemAlert={handleSystemAlert}/>}
			>
				<p className='fontMedium'>
				(디스코드아이디)
				</p>
			</DashCard>
			<DashCard 
				title={'Email'}
				iconLeft={<ContactIcon item={{
					imgPath:'/portfolio/icons/icon_email.png',
					title:'이메일',
					colorString:'#2196F3'
				}}/>}
				iconRight={<ContactCopy stringVal={'sandfox9411@gmail.com'} handleSystemAlert={handleSystemAlert}/>}
			>
				<p className='fontMedium'>
				sandfox9411@gmail.com
				</p>
			</DashCard>
			<DashCard 
				title={'Github'}
				iconLeft={<ContactIcon item={{
					imgPath:'/portfolio/icons/icon_github.png',
					title:'깃허브',
					colorString:'#181717'
				}}/>}
				iconRight={<ContactCopy stringVal={'https://github.com/thesandfox'} handleSystemAlert={handleSystemAlert}/>}
			>
				<p className='fontMedium'>
				https://github.com/thesandfox
				</p>
			</DashCard>
		</section>
	</>
}