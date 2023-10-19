import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useTree, CellTree, TreeExpandClickTypes } from '@table-library/react-table-library/tree';
import {
	Table,
	Header,
	HeaderRow,
	Body,
	Row,
	HeaderCell,
	Cell,
} from '@table-library/react-table-library/table';

const formatDate = (dateString) => {
	const date = new Date(dateString);
	const month = date.getMonth();
	const day = date.getDay() + 1;
	const year = date.getFullYear();
	return `${month < 10 && '0'}${month}/${day < 10 && '0'}${day}/${year}`;
}

const ClueTable = ({ data }) => {
	const resizer = { resizerWidth: 10 };
	const theme = useTheme([ getTheme(), {
		Table: `grid-template-columns:  min-content min-content 1fr;`,
		HeaderRow: `background-color: #eaf5fd;`
	}]);

	let nodes = data.reduce((prevValue, item, reducerIndex) => {
		let questionsData = [];

		for (let count = 0; count < item.questions.length; count++) {
			questionsData.push({ id: data.length + count, category: `Question ${count + 1}`, questions: item.questions[count].question, nodes: [{ category: 'Answer', questions: item.questions[count].correctResponse }] });
		};
		
		const newData = [...prevValue,
			{
				id: reducerIndex,
				updatedAt: formatDate(item.updatedAt),
				category: item.category,
				questions: 'Drop To Reveal',
				nodes: questionsData
			}
		];
		return newData;
	}, [])

	const formatedData = { nodes };
	const tree = useTree(
		formatedData,
		{
			onChange: (action, state) => {
				// console.log(action, state);
			}
		},
		{
			clickType: TreeExpandClickTypes.ButtonClick
		}
	);

	return (
		<Table theme={theme} data={formatedData} tree={tree}>
			{(tableList) => (
				<>
				<Header>
					<HeaderRow>
						<HeaderCell resize={resizer}>Last Modified</HeaderCell>
						<HeaderCell resize={resizer}>Category</HeaderCell>
						<HeaderCell>Questions</HeaderCell>
					</HeaderRow>
				</Header>
				<Body>
					{ tableList.map((item, index) => (
						<Row key={index} item={item}>
							<Cell>{item.updatedAt}</Cell>
							<Cell>{item.category}</Cell>
							<CellTree item={item}>{item.questions}</CellTree>
						</Row>
					)) }
				</Body>
				</>
			)}
		</Table>
	)
}

export default ClueTable;