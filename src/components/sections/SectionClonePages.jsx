import { ClonePages } from '../generic/ClonePage';
import './section.css';

export default function SectionClonePages({outerRef}) {
	return <>
		<section id={'clonePages'} ref={outerRef}>
			<ClonePages/>
		</section>
	</>
}