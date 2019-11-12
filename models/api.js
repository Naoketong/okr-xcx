const PREFIX = 'http://localhost:3000/api';
export default{
	test: PREFIX + '/test',
	todo: PREFIX + '/todo',
	todoItem: (id) => `${PREFIX}/todo/${id}`,
	okr: PREFIX + '/okr',
	okrItem: (id) => `${PREFIX}/okr/${id}`,

}


