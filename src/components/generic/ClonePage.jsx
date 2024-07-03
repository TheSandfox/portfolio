import './clonepage.css';
import CLONE_PAGE_DATAS from '/src/datas/clonePageDatas';

function ClonePageCard({item}) {
	return <>
		<div className='clonePageCard'>
			{/*이미지 백드롭*/}
			<img src={item.imgPath} alt={item.title}/>
			{/* 호버시 오버레이 */}
			<div className='overlay'>

			</div>
			{/* 하단 제목 */}
			<div className='bottom'>
				<h4 className='fontMedium'>{item.title}</h4>
				<p className='fontMain'>{item.dateStart} ~ {item.dateEnd}</p>
			</div>
		</div>
	</>
}

export function ClonePages() {
	return <div className="clonePageRows">
		{CLONE_PAGE_DATAS.map((items,index1)=>{
			return <div className='clonePageRow' key={index1}>
				{items.map((item,index2)=>{
					return <ClonePageCard item={item} key={index2}/>
				})}
			</div>
		})}
	</div>	
}