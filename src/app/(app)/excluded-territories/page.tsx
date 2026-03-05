import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import '../../markdown.css';
// TODO: Replace with data from DB
const data = `
# Excluded Territories

- Alabama
- Arizona
- Connecticut
- Idaho
- Kentucky
- Louisiana
- Michigan
- Montana
- Nevada
- New York
- Tennessee
- Washington
`
export default function PrivacyPolicy() {
	return (
		<div className="text-white bg-[#00000070] font-['Exo_2'] h-full w-full">
			<div className="max-w-[1050px] w-full h-full m-auto p-8 overflow-y-scroll no-scrollbar md-wraper">
				<Markdown remarkPlugins={[remarkGfm]}>{data}</Markdown>
			</div>
		</div>
	);
}