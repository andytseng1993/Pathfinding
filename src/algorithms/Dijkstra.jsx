// startNode , endNode = [row,col]
export const dijkstra = (pathes, startNode, endNode) => {
	if (startNode.length === 0 || startNode.length === 0) return
	let visitedNodesInOrder = []
	// deep copy the pathes to prevent useState value changing
	const nodes = JSON.parse(JSON.stringify(pathes))
	// const unvisitedNode = getGraph(pathes)
	let unvisitedNode = []
	unvisitedNode.push(nodes[startNode[0]][startNode[1]])
	console.log(unvisitedNode)
	while (unvisitedNode.length > 0) {
		unvisitedNode.sort((a, b) => a.distance - b.distance)
		const currentNode = unvisitedNode.shift()
		if (currentNode.isWall) continue
		if (currentNode.isVisited) continue
		currentNode.isVisited = true
		visitedNodesInOrder.push(currentNode)
		if (currentNode.row === endNode[0] && currentNode.col === endNode[1])
			return visitedNodesInOrder
		const currentNodeNeighbors = getNeighbors(nodes, currentNode)
		for (let neighbor of currentNodeNeighbors) {
			neighbor.distance = currentNode.distance + 1
			neighbor.previousNode = currentNode
			unvisitedNode.push(neighbor)
		}
	}
}

const getGraph = (nodes) => {
	const graph = []
	for (let row of nodes) {
		for (let node of row) {
			graph.push(node)
		}
	}
	return graph
}

const getNeighbors = (pathes, currentNode) => {
	const neighbors = []
	const { row, col } = currentNode
	// to right
	if (col < pathes[0].length - 1) neighbors.push(pathes[row][col + 1])
	//to down
	if (row < pathes.length - 1) neighbors.push(pathes[row + 1][col])
	// to left
	if (col > 0) neighbors.push(pathes[row][col - 1])
	// to top
	if (row > 0) neighbors.push(pathes[row - 1][col])
	return neighbors.filter((neighbor) => !neighbor.isVisited)
}

export function getShortestPathOrder(finishNode) {
	const shortestPathOrder = []
	let currentNode = finishNode
	while (currentNode !== null) {
		shortestPathOrder.unshift(currentNode)
		currentNode = currentNode.previousNode
	}
	return shortestPathOrder
}
