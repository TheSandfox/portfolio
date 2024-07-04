import SimpleButton from './generic/SimpleButton';
import './social.css';

export default function Social({}) {
	return <div id={'social'}>
		{/* 깃 */}
		<SimpleButton 
			to={'https://github.com/thesandfox'} 
			title={'깃허브'} 
			colorString={'#181717'}
			className={'hoverInverse'}
			imgPath={'/portfolio/icons/icon_github.png'}
		/>
		{/* 카카오 */}
		<SimpleButton 
			to={'https://open.kakao.com/o/sATDcVAg'} 
			title={'카카오톡 오픈채팅'} 
			colorString={'#FFEB3B'}
			className={'hoverBrightness'}
			imgPath={'/portfolio/icons/icon_kakao.png'}
		/>
		{/* 디코 */}
		<SimpleButton 
			to={'https://discord.com/invite/nHBQrSS9'} 
			title={'디스코드'} 
			colorString={'#5C6BC0'}
			className={'hoverBrightness'}
			imgPath={'/portfolio/icons/icon_discord.png'}
		/>
	</div>
}