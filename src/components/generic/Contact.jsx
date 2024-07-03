import { useCallback } from 'react';
import './contact.css'

export function ContactCopy({stringVal,handleSystemAlert}) {
	const clickCallback = useCallback(()=>{
		navigator.clipboard.writeText(stringVal).then(() => {
			handleSystemAlert.set('클립보드에 복사하였습니다');
		});
	},[stringVal,handleSystemAlert]);
	return <div className='contactCopy' onClick={clickCallback}>
		<img src='/portfolio/icons/icon_copy.png' alt='내용물 복사'/>
	</div>
}

export function ContactIcon({item}) {
	return <div 
		className='contactIcon' 
		title={item.title} 
		style={{backgroundColor:item.colorString}}
	>
	<img src={item.imgPath} alt={item.title}/>
</div>
}