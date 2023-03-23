import { getNeighbors } from './Dijkstra'

export const aStar = (pathes, startNode, endNode) => {
	if (startNode.length === 0) return 'Please set start node !'
	if (endNode.length === 0) return 'Please set end node !'
	let visitedNodesInOrder = []
	let unvisitedNode = []
	const nodes = JSON.parse(JSON.stringify(pathes))
	const finishNode = nodes[endNode[0]][endNode[1]]
	unvisitedNode.push(nodes[startNode[0]][startNode[1]])
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
			neighbor.gScore = currentNode.gScore + 1
			neighbor.distance =
				currentNode.gScore +
				1 +
				Math.sqrt(
					Math.pow(finishNode.row - neighbor.row, 2) +
						Math.pow(finishNode.col - neighbor.col, 2)
				)
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
