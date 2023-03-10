// startNode , endNode = [row,col]
export const dijkstra = (pathes, startNode, endNode) => {
	if (startNode.length === 0 || startNode.length === 0) return
	const visitedNodesInOrder = []
	// const unvistedNode = getGraph(pathes)
	const unvistedNode = []
	unvistedNode.push(pathes[startNode[0]][startNode[1]])
	while (unvistedNode.length > 0) {
		unvistedNode.sort((a, b) => a.distance - b.distance)
		const currentNode = unvistedNode.shift()
		if (currentNode.isWall) continue
		if (currentNode.isVisited) continue
		currentNode.isVisited = true
		visitedNodesInOrder.push(currentNode)
		if (currentNode.row === endNode[0] && currentNode.col === endNode[1])
			return visitedNodesInOrder
		const currentNodeNeighbors = getNeighbors(pathes, currentNode)
		for (let neighbor of currentNodeNeighbors) {
			neighbor.distance = currentNode.distance + 1
			neighbor.previousNode = currentNode
			unvistedNode.push(neighbor)
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
