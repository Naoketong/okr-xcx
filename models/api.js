const PREFIX = 'http://localhost:3000/api';
export default{
	test: PREFIX + '/test',
	login: PREFIX + '/login',								
	todo: PREFIX + '/todo',
	todoItem: (id) => `${PREFIX}/todo/${id}`,
	okr: PREFIX + '/okr',
	okrItem: (id) => `${PREFIX}/okr/${id}`,
	objective: PREFIX + '/objective',
	objectiveItem: (id) => `${PREFIX}/objective/${id}`,
	keyresultItem: (id) => `${PREFIX}/keyresult/${id}`,
	todoKeyresult: (id) => `${PREFIX}/todo/${id}/keyresult`,
}


