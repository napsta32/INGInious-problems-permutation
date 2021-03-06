/* @flow */
import GridSystem from './GridSystem';
import { IdManager } from './IdManager';
import Item from './Item';
import PermutationList from './PermutationList';


function generate_trello_ui(pid: string, elems: Array<string>, elemsId: Array<string>, 
							tablesMetadata: Array<[string,string]>) {
	var nullListsContainer: HTMLElement|null = document.getElementById(IdManager.stringify(IdManager.TPL_ANSWER_CONTAINER))
	// var nullCandidatesContainer: HTMLElement|null = document.getElementById(IdManager.stringify(IdManager.TPL_CANDIDATES_CONTAINER))
	var nullHiddenInputs: HTMLElement|null = document.getElementById(IdManager.stringify(IdManager.TPL_HIDDEN_INPUTS))

	if(nullListsContainer==null || nullHiddenInputs==null) {
		console.error(`Something is null:`)
		console.log(nullListsContainer)
		console.log(nullHiddenInputs)
		return;
	}

	const listsContainer: HTMLElement = nullListsContainer;
	// const candidatesContainer: HTMLElement = nullCandidatesContainer;
	const hiddenInputs: HTMLElement = nullHiddenInputs;

	var items: Array<Item> = [];

	for(let i=0;i<elems.length;i++) {
		var item: Item;

		item = new Item(i+1, elemsId[i], elems[i]) // 1,2,3
		item.build(tablesMetadata[0][0])

		hiddenInputs.appendChild(item.get_iposHiddenInput())
		hiddenInputs.appendChild(item.get_posHiddenInput())

		items.push(item)
	}
	return new GridSystem(listsContainer, items, tablesMetadata)
}

function generate_list_ui(pid: string, elems: Array<string>, elemsId: Array<string>, 
							tablesMetadata: Array<[string,string]>) {
	const tableName = tablesMetadata[1][0];
	const tableColor = tablesMetadata[1][1];
	
	var nullAnswersContainer: HTMLElement|null = document.getElementById(IdManager.stringify(IdManager.TPL_ANSWER_CONTAINER))
	var nullHiddenInputs: HTMLElement|null = document.getElementById(IdManager.stringify(IdManager.TPL_HIDDEN_INPUTS))

	if(nullAnswersContainer==null || nullHiddenInputs==null) {
		console.error(`Something is null:`)
		console.log(nullAnswersContainer)
		console.log(nullHiddenInputs)
		return;
	}

	var container = document.createElement('div');
	container.setAttribute('class', 'permutation-column')

	var headerContainer = document.createElement('div');
	headerContainer.setAttribute('class', 'permutation-column-header unselectable');
	headerContainer.style.background = tableColor;
	var header = document.createElement('span')
	header.setAttribute('class', 'glyphicon glyphicon-th-list')
	headerContainer.appendChild(header);
	headerContainer.innerHTML += `<b> ${tableName}</b>`;

	let gridContainer = document.createElement('div');
	gridContainer.setAttribute('class', 'permutation-column-content')
	
	container.appendChild(headerContainer)
	container.appendChild(gridContainer)
	nullAnswersContainer.appendChild(container);

	const answersContainer: HTMLElement = gridContainer;
	const hiddenInputs: HTMLElement = nullHiddenInputs;

	var items: Array<Item> = [];

	for(let i=0;i<elems.length;i++) {
		var item: Item;

		item = new Item(i+1, elemsId[i], elems[i]) // Starts in 1
		item.build(tableName)

		answersContainer.appendChild(item.get_card())
		hiddenInputs.appendChild(item.get_iposHiddenInput())
		hiddenInputs.appendChild(item.get_posHiddenInput())

		items.push(item)
	}
	return new PermutationList(answersContainer, items, tableName)
}

export function generate_ui(ptype: 'trello'|'list', pid: string, elems: Array<string>, elemsId: Array<string>,
							tablesMetadata: Array<[string,string]>) {
	IdManager.init(pid);

	// console.log(ptype)
	
	if(ptype=='trello')
		return generate_trello_ui(pid, elems, elemsId, tablesMetadata);
	if(ptype=='list')
		return generate_list_ui(pid, elems, elemsId, tablesMetadata);
}


// generate_permutation_list([Array(110).join(' C-C C+C ') + ';','D','A','B'], '.board-column-content');
