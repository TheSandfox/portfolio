import { Link } from 'react-router-dom';
import './simplebutton.css';

export default function SimpleButton({title,imgPath,colorString,to,onClick,className}) {
	const iconJSX = <>
		<img src={imgPath} alt={title} className='icon'/>
	</>
	const configuration = {
		style:{
			backgroundColor:colorString,
			cursor:(to||onClick)?'pointer':'initial'
		},
		className:`simpleButton${className?(' '+className):''}`
	}
	return <>{
		to
		?<Link to={to} target={'_blank'} {...configuration}>
			{iconJSX}
		</Link>
		:<div onClick={onClick} {...configuration}>
			{iconJSX}
		</div>
	}</>
}