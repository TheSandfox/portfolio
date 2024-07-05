import { useCallback, useContext } from 'react';
import './contact.css'
import { AppContext } from '../../App';

export function ContactCopy({stringVal}) {
	const { handleSystemAlert } = useContext(AppContext);
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