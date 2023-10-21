import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { useNavigate } from 'react-router-dom';
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

const BoardTable = ({ data }) => {
	const navigate = useNavigate()
	const resizer = { resizerWidth: 10 };
	const theme = useTheme([ getTheme(), {
		Table: `grid-template-columns:  min-content min-content min-content 1fr;`,
		HeaderRow: `background-color: #eaf5fd;`,
	}]);

	let nodes = data.reduce((prevValue, item, reducerIndex) => {
		const categories = item.clues.map(child => child.category);
		
		let nodes = [];

		for (let count = 1; count < categories.length; count++) {
			nodes.push({ category: categories[count] });
		};
		
		const newData = [...prevValue,
			{
				_id: item._id,
				key: reducerIndex,
				createdAt: formatDate(item.createdAt),
				updatedAt: formatDate(item.updatedAt),
				name: item.name,
				category: categories[0],
				nodes: nodes
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

	const selectRow = (id) => {
		navigate(`/board/${id}`)
	}

	return (
		<Table theme={theme} data={formatedData} tree={tree}>
			{(tableList) => (
				<>
				<Header>
					<HeaderRow>
						<HeaderCell resize={resizer}>Last Modified</HeaderCell>
						<HeaderCell resize={resizer}>Date Created</HeaderCell>
						<HeaderCell resize={resizer}>Name</HeaderCell>
						<HeaderCell>Categories</HeaderCell>
					</HeaderRow>
				</Header>
				<Body>
					{ tableList.map(item => (
						<Row onClick={e => selectRow(item._id)} key={item.key} item={item}>
							<CellTree item={item}>{item.updatedAt}</CellTree>
							<Cell>{item.createdAt}</Cell>
							<Cell>{item.name}</Cell>
							<Cell>{item.category}</Cell>
						</Row>
					)) }
				</Body>
				</>
			)}
		</Table>
	)
}

export default BoardTable;