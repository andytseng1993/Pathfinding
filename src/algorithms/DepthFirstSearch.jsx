import { getNeighbors } from './Dijkstra'

export const depthFirstSearch = (pathes, startNode, endNode) => {
	if (startNode.length === 0) return 'Please set start node !'
	if (endNode.length === 0) return 'Please set end node !'
	let visitedNodesInOrder = []
	// deep copy the pathes to prevent useState value changing
	const nodes = JSON.parse(JSON.stringify(pathes))
	let unvisitedNode = []
	//start point
	unvisitedNode.push(nodes[startNode[0]][startNode[1]])
	while (unvisitedNode.length > 0) {
		const currentNode = unvisitedNode.pop()
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
	if (unvisitedNode.length === 0) {
		return {
			warning: 'Cannot find the finish node!',
			visitedPath: visitedNodesInOrder,
		}
	}
}
