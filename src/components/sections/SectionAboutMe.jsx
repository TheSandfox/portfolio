import './section.css';
import { ProfileBadgeContainer } from '/src/components/generic/ProfileBadge'

const PROFILE_VALUES = [
	//이름, 생일, 위치
	[
		{
			imgPath:'/portfolio/icons/icon_user.png',
			title:'이름',
			content:'전인탁',
			colorString:'#999',
		},
		{
			imgPath:'/portfolio/icons/icon_birthday.png',
			title:'생년월일',
			content:'1994.11.29',
			colorString:'#999',
		},
		{
			imgPath:'/portfolio/icons/icon_location.png',
			title:'위치',
			content:'경기도 남양주시 별내면',
			colorString:'#999',
		},
	],
	//전번, 이멜
	[
		{
			imgPath:'/portfolio/icons/icon_call.png',
			title:'연락처',
			content:'010-7221-3766',
			colorString:'#999',
		},
		{
			imgPath:'/portfolio/icons/icon_email.png',
			title:'이메일',
			content:'sandfox9411@gmail.com',
			colorString:'#999',
		},
	]
]

export default function SectionAboutMe({outerRef}) {
	return <>
		<section ref={outerRef}>
			<ProfileBadgeContainer
				args={PROFILE_VALUES}
			/>
		</section>
	</>
}