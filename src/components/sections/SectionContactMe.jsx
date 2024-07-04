import DashCard from '/src/components/generic/DashCard';
import './section.css';
import { ContactIcon, ContactCopy } from '../generic/Contact';
import { Link } from 'react-router-dom';

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
				전인탁: 010-7221-3766
				</p>
			</DashCard>
			<DashCard 
				title={'KakaoTalk'}
				iconLeft={<ContactIcon item={{
					imgPath:'/portfolio/icons/icon_kakao.png',
					title:'카카오톡',
					colorString:'#FFEB3B'
				}}/>}
				iconRight={<ContactCopy stringVal={'https://open.kakao.com/o/sATDcVAg'} handleSystemAlert={handleSystemAlert}/>}
			>
				<Link to={'https://open.kakao.com/o/sATDcVAg'} style={{textDecoration:'underline'}} target={'_blank'} className='fontMedium'>
				https://open.kakao.com/o/sATDcVAg
				</Link>
			</DashCard>
			<DashCard 
				title={'Discord'}
				iconLeft={<ContactIcon item={{
					imgPath:'/portfolio/icons/icon_discord.png',
					title:'디스코드',
					colorString:'#5C6BC0'
				}}/>}
				iconRight={<ContactCopy stringVal={'https://discord.com/invite/nHBQrSS9'} handleSystemAlert={handleSystemAlert}/>}
			>
				<Link to={'https://discord.com/invite/nHBQrSS9'} style={{textDecoration:'underline'}} target={'_blank'} className='fontMedium'>
				https://discord.com/invite/nHBQrSS9
				</Link>
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
				<Link to={'https://github.com/thesandfox'} style={{textDecoration:'underline'}} target={'_blank'} className='fontMedium'>
				https://github.com/thesandfox
				</Link>
			</DashCard>
		</section>
	</>
}