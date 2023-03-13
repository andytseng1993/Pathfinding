export const primAlgorithm = (pathes) => {
	let rowRandom = Math.floor(Math.random() * 15)
	let colRandom = Math.floor(Math.random() * 49)
	const nodes = JSON.parse(JSON.stringify(pathes))
	if (rowRandom % 2 === 1) rowRandom += 1
	if (colRandom % 2 === 1) colRandom += 1
	const start = nodes[rowRandom][colRandom]
	const frontier = []
	frontier.push(start)
	const visited = []
	while (frontier.length > 0) {
		const currentNode = frontier.splice(
			Math.floor(Math.random() * frontier.length),
			1
		)[0]
		if (currentNode.isMazeVisited) continue
		currentNode.isWall = false
		currentNode.isMazeVisited = true
		visited.push(currentNode)
		const currentNodeNeighbors = getNeighbors(nodes, currentNode)
		if (currentNodeNeighbors.isVisited.length > 0) {
			const visitedNode =
				currentNodeNeighbors.isVisited[
					Math.floor(Math.random() * currentNodeNeighbors.isVisited.length)
				]
			const middleNode =
				nodes[(visitedNode.row + currentNode.row) / 2][
					(visitedNode.col + currentNode.col) / 2
				]
			middleNode.isWall = false
			middleNode.isMazeVisited = true
			visited.push(middleNode)
		}
		frontier.push(...currentNodeNeighbors.unVisited)
	}
	return visited
}
const getNeighbors = (pathes, currentNode) => {
	const neighbors = []
	const { row, col } = currentNode
	// to right
	if (col < pathes[0].length - 2) neighbors.push(pathes[row][col + 2])
	//to down
	if (row < pathes.length - 2) neighbors.push(pathes[row + 2][col])
	// to left
	if (col > 1) neighbors.push(pathes[row][col - 2])
	// to top
	if (row > 1) neighbors.push(pathes[row - 2][col])

	const isVisited = neighbors.filter((neighbor) => neighbor.isMazeVisited)
	const unVisited = neighbors.filter((neighbor) => !neighbor.isMazeVisited)
	return { isVisited, unVisited }
}
