import { ClonePages } from '../generic/ClonePage';
import SectionTitle from './SectionTitle';
import './section.css';

export default function SectionClonePages({outerRef}) {
	return <>
		<section id={'clonePages'} ref={outerRef}>
			<SectionTitle>CLONEPAGES</SectionTitle>
			<div className='contents'>
				<ClonePages/>
			</div>
		</section>
	</>
}