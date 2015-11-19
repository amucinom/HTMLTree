function startUp() {
	initHTMLTree();
	showTree();
}

function showTree() {
	document.getElementById("theTreeOptionsWrapper").style.display = "none";
	$("#theTreeWrapper").fadeIn();
	$("#previewWrapper").fadeOut();
	$('#dfsWrapper').fadeOut();
	$("#bfsWrapper").fadeOut();
	$("#treeButton").addClass("active");
	$("#previewButton").removeClass("active");
	$('#dfsButton').removeClass('active');
	$("#bfsButton").removeClass('active');
}

function showDFS() {
	$('#dfsWrapper').empty();
	dfs();
	$("#theTreeWrapper").fadeOut();
	$('#previewWrapper').fadeOut();
	$("#bfsWrapper").fadeOut();
	$("#dfsWrapper").fadeIn();
	$("#treeButton").removeClass("active");
	$('#previewButton').removeClass('active');
	$('#bfsButton').removeClass('active');
	$("#dfsButton").addClass("active");
}

function showBFS() {
	$('#bfsWrapper').empty();
	bfs();
	$("#theTreeWrapper").fadeOut();
	$('#previewWrapper').fadeOut();
	$('#dfsWrapper').fadeOut();
	$("#bfsWrapper").fadeIn();
	$("#treeButton").removeClass("active");
	$('#previewButton').removeClass('active');
	$("#dfsButton").removeClass("active");
	$("#bfsButton").addClass("active");

}

function showPreview() {
	$("#theTreeWrapper").fadeOut();
	$('#dfsWrapper').fadeOut();
	$("#bfsWrapper").fadeOut();
	$("#previewWrapper").fadeIn();
	$("#treeButton").removeClass("active");
	$('#dfsButton').removeClass('active');
	$('#bfsButton').removeClass('active');
	$("#previewButton").addClass("active");
	generatePreview();
}

var allRoots = [];
var bodyID = null;

function addNewElement() {
	$("#HTMLTree").addClass("hideEdit");
	var node = theHTMLTree.tree('getNodeById', bodyID);
	var info = prompt('Enter tag name and type');
	if (node) {
		$('#HTMLTree').tree(
			'addNodeBefore', {
				id: new Date().getTime().toString(),
				label: "<" + info + ">",
				nodeID: "",
				style: "",
				className: "",
				innerHTML: "",
				children: [],
				type: info
			},
			node
		);
	}
}




var theHTMLTree = null;
// var row = null;


function initHTMLTree() {
	row = [{
		id: new Date().getTime().toString(),
		label: "<BODY>",
		nodeID: "",
		children: [],
		type: "BODY",
		style: "",
		className: "",
		innerHTML: ""
	}];
	bodyID = row[0].id;

	theHTMLTree = $('#HTMLTree').tree({
		dragAndDrop: true,
		autoOpen: 0,
		data: row,
		onCreateLi: function(node, $li) {

			  // $li.find('.jqtree-element').append(
			  //   '<a href="javascript:nodeOptions(' + "'" + node.id + "','" + node.type + "'," + node.getLevel() + ")" + '" class="edita link" data-node-id="'+
			  // node.id +'">edit</a>'
			  // );

		},
		onCanMoveTo: function(moved_node, target_node, position) {
			return true;
		}
	});
	$('#HTMLTree').bind(
		'tree.move',
		function(event) {
			aHTMLTreeNodeWasMoved();
			if (event.node) {
				var node = event.node;
			}
		}
	);

	$('#HTMLTree').bind(
		'tree.select',
		function(event) {
			if (event.node) {
				var node = event.node;
				currEditNode = node;
				aHTMLTreeNodeWasSelected();
			}
		}
	);
}

/**
 * Breadth First Search Tree Traversal in-order
 * @return {null} It will display a div or wrapper with
 * how the tree was traversed in DFS
 */
function bfs() {
	var queue = new Queue();
	var root = theHTMLTree.tree('getTree');

	$('#bfsWrapper')
		.append('<h2>Breadth First Search</h2>');

	queue.enqueue(root);

	var currentTree = queue.dequeue();

	var bfsPrint = function(node) {
		if (node.id === undefined) {
			// console.log('**Root of tree**');
			return;
		}
		console.log(node.name + ' ID: ' + node.id);
		$('#bfsWrapper').append('<p>Name: <strong>' + node.type + '</strong>, ID: <em>' + node.id + '</em></p>');
	};

	while (currentTree) {

		for (var i = 0, length = currentTree.children.length; i < length; i++) {
			queue.enqueue(currentTree.children[i]);

		}
		bfsPrint(currentTree);
		currentTree = queue.dequeue();
	}

}

/**
 * Depth First Search Tree Traversal in Post-Order
 * @return {null} It will display a div or wrapper with
 * how the tree was traversed in DFS
 */
function dfs() {
	var root = theHTMLTree.tree('getTree');
	$('#dfsWrapper')
		.append('<h2>Depth First Search - Post Order</h2>');
	// var res = [];

	var dfsPrint = function(node) {
		if (node.id === undefined) {
			// console.log('**Root of tree**');
			return;
		}
		console.log(node.name + ' ID: ' + node.id);
		// $('#dfsWrapper')
		// 	.html('ID: ' + node.id + '\n');
		// res.push(node.id);
		$('#dfsWrapper').append('<p>Name: <strong>' + node.type + '</strong>, ID: <em>' + node.id + '</em></p>');
	};

	(function dfsRecurse(currentNode) {
		var length = currentNode.children.length;
		for (var i = 0; i < length; i++) {
			dfsRecurse(currentNode.children[i]);
		}

		dfsPrint(currentNode);

	})(root);
	// $('#dfsWrapper').html(res.map(function () {
	// 	for (var i = 0; i < res.length; i++) {
	// 		return res[i] + '\n';
	// 	}
	// }));
}

function aHTMLTreeNodeWasMoved() {}

function cancelClicked() {
	document.getElementById("theTreeWrapper").style.display = "block";
	document.getElementById("theTreeOptionsWrapper").style.display = "none";
	document.getElementById("treeSelector").style.display = "block";
}


function aHTMLTreeNodeWasSelected() {
	document.getElementById("treeSelector").style.display = "none";
	document.getElementById("theTreeWrapper").style.display = "none";
	document.getElementById("theTreeOptionsWrapper").style.display = "block";
	populateNodeAttrs();
}

function newRow() {
	var temp = new Date().getTime().toString();
	var outS = "<input value=''>" + "<input value=''>" + "<a class='" + temp + " btn btn-danger btn-xs' href='javascript:deleteAttr(" + '"' + temp + '")' + "'> Delete </a>" + "<br>";
	document.getElementById("attrWrapper").innerHTML += outS;
}


function getNodeAttrs() {
	var ret = {};
	var list = document.getElementById("attrWrapper").getElementsByTagName("input");
	for (var i = 0; i < list.length; i++) {

	}

	return ret;
}

function populateNodeAttrs() {
	var keys = Object.keys(currEditNode);
	var outS = "";
	var noEdits = ["id"];
	var onlyValueEdits = ["nodeID", "name", "type", "style", "className"];

	for (var i = 0; i < keys.length; i++) {
		if (typeof currEditNode[keys[i]] === "object") {
			continue;
		}
		if (noEdits.indexOf(keys[i]) >= 0) { // key is part of noEdit
			outS = outS + "<input value='" + keys[i] + "' readonly>" +
				"<input value='" + currEditNode[keys[i]] + "' readonly>" +
				"<br class='" + currEditNode[keys[i]] + " '>";
		} else if (onlyValueEdits.indexOf(keys[i]) >= 0) { // key is part of onlyValueEdit
			var x = "";
			if (keys[i] == "type" && currEditNode.id == bodyID) x = "readonly";
			outS = outS + "<input class='' value='" + keys[i] + "' readonly>" +
				"<input value='" + currEditNode[keys[i]] + "' " + x + ">" +
				"<br class='" + currEditNode[keys[i]] + " '>";
		} else {
			outS = outS + "<input class='" + keys[i] + "' value='" + keys[i] + "'>" +
				"<input class='" + keys[i] + "' value='" + currEditNode[keys[i]] + "'>" +
				"<a class='" + keys[i] + "' href='javascript:deleteAttr(" + '"' + keys[i] + '")' + "'> Delete </a>" +
				"<br class='" + keys[i] + " '>";
		}
	}

	document.getElementById("attrWrapper").innerHTML = outS;
}


function deleteAttr(c) {
	var flag = confirm("Are you sure you want to delete attr: " + c + " ?");
	if (flag) {
		$("#attrWrapper ." + c).remove();
	}
}

var currEditNode = null;
var currWidget = null;

function getPagePreview(pInfo) {}


function nodeOptions(nodeID, type, level) {
	currEditNode = nodeID;
	var theNode = theHTMLTree.tree('getNodeById', currEditNode);
	var keys = Object.keys(theNode);

}

function backClicked() {
	cancelEdit();
}

function cancelEdit() {}

function saveClicked() {
	var saveObj = getNodeAttrs();
	$("#HTMLTree").tree(
		'updateNode',
		currEditNode,
		saveObj
	);
	cancelClicked();
}

// function saveEdit() {
// 	theNode = theHTMLTree.tree('getNodeById', currEditNode);
// 	theHTMLTree.tree(
// 		'updateNode',
// 		theNode, {
// 			label: document.getElementById("menuNodeName").value,
// 			subname: document.getElementById("menuNodeSubName").value,
// 			icon: document.getElementById("faSel").value
// 		}
// 	);
// }

function deletePage() {
	dialogConfirm.display("Delete Page# <div class='font75'>" + currEditNode + "</div>", "fa fa-file-text-o", "Cancel", null, "Delete", "pageDeleteYesClicked()");
}

function pageDeleteYesClicked() {
	activityIndicator.show();
	var node = theHTMLTree.tree('getNodeById', currEditNode);
	if (node) {
		$('#HTMLTree').tree(
			'removeNode',
			node
		);
		document.getElementById("navMapOptionsWrapper").display = "none";
		aHTMLTreeNodeWasMoved();
	}
	cancelEdit();
}

function generatePreview() {
	var i;
	var temp;
	var Parent;
	var rand = "_" + new Date().getTime().toString();

	var pathAlongDOM = new Array();
	document.getElementById("previewWrapper").innerHTML = "";

	$('#HTMLTree').tree('getTree').iterate(
		function(node, level) {
			console.log(node.id, level);
			if (level === 0) {
				Parent = document.getElementById("previewWrapper");
				Parent.name = node.name;
				pathAlongDOM = [Parent];
			}
			console.log(pathAlongDOM.length, level);
			while (pathAlongDOM.length > level + 1) {
				pathAlongDOM.pop();
			}

			Parent = pathAlongDOM[pathAlongDOM.length - 1];

			var type = node.type;
			if (type.toLowerCase() == "body") {
				type = "div";
			}

			var NewNode = document.createElement(type);

			var keys = Object.keys(node);
			for (var i = 0; i < keys.length; i++) {
				NewNode[keys[i]] = node[keys[i]];
			}


			NewNode.id = node.nodeID + rand;
			if (node.nodeID.length === 0) {
				NewNode.id = node.id + rand;
			}
			Parent.appendChild(NewNode);
			pathAlongDOM.push(NewNode);

			return true;
		}
	);
}




var tree1 = '[{"id":"1447692676177","name":"<BODY>","nodeID":"","type":"BODY","style":"","className":"","innerHTML":"","is_open":true,"children":[{"id":"1447692680511","name":"Wrapper 1","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":false,"children":[{"id":"1447692749749","name":"H1","nodeID":"","style":"","className":"","innerHTML":"","type":"H1"},{"id":"1447692766027","name":"H2","nodeID":"","style":"","className":"","innerHTML":"","type":"H2"},{"id":"1447692786169","name":"Para","nodeID":"","style":"","className":"","innerHTML":"","type":"p"}]},{"id":"1447692712967","name":"Wrapper 2","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":false,"children":[{"id":"1447692740254","name":"H1","nodeID":"","style":"","className":"","innerHTML":"","type":"H1"},{"id":"1447692765760","name":"H2","nodeID":"","style":"","className":"","innerHTML":"","type":"H2"},{"id":"1447692786474","name":"Para","nodeID":"","style":"","className":"","innerHTML":"","type":"p"}]}]}]';
var tree1Root = "1447692676177";

var tree2 = '[{"id":"1447821849583","name":"<BODY>","nodeID":"","type":"BODY","style":"","className":"","innerHTML":"","is_open":true,"children":[{"id":"1447821875018","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":true,"children":[{"id":"1447821875185","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":true,"children":[{"id":"1447821874515","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"},{"id":"1447821873496","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":true,"children":[{"id":"1447821873845","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"}]},{"id":"1447821874029","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"}]}]},{"id":"1447821874684","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":true,"children":[{"id":"1447821873677","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"},{"id":"1447821874849","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"}]}]}]';
var tree2Root = "1447821849583";

var tree3 = '[{"id":"1447821972921","name":"<BODY>","nodeID":"","type":"BODY","style":"","className":"","innerHTML":"","is_open":true,"children":[{"id":"1447821974587","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":true,"children":[{"id":"1447821975009","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"},{"id":"1447821974734","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"},{"id":"1447821974420","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":true,"children":[{"id":"1447821974111","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"}]},{"id":"1447821974884","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":true,"children":[{"id":"1447821974261","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"}]}]}]}]';

var tree3Root = "1447821972921";


function loadTree1() {
	$("#HTMLTree").tree('loadData', JSON.parse(tree1));
	bodyID = tree1Root;
}

function loadTree2() {
	$("#HTMLTree").tree('loadData', JSON.parse(tree2));
	bodyID = tree2Root;
}

function loadTree3() {
	$("#HTMLTree").tree('loadData', JSON.parse(tree3));
	bodyID = tree3Root;
}


/**
 * Queue
 */

function Queue() {
	this._oldestIndex = 1;
	this._newestIndex = 1;
	this._storage = {};
}

Queue.prototype.size = function() {
	return this._newestIndex - this._oldestIndex;
};

Queue.prototype.enqueue = function(data) {
	this._storage[this._newestIndex] = data;
	this._newestIndex++;
};

Queue.prototype.dequeue = function() {
	var oldestIndex = this._oldestIndex,
		newestIndex = this._newestIndex,
		deletedData;

	if (oldestIndex !== newestIndex) {
		deletedData = this._storage[oldestIndex];
		delete this._storage[oldestIndex];
		this._oldestIndex++;

		return deletedData;
	}
};