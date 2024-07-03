import './dashcard.css';

export default function DashCard({children,title,iconLeft,iconRight}) {
	return <>
		<div className='dashCard'>
			{iconLeft||<></>}
			<div className='middle'>
				<h3 className='title fontMedium'>
					{title}
				</h3>
				<div className='content'>
					{children||<></>}
				</div>
			</div>
			{iconRight||<></>}
		</div>
	</>
}