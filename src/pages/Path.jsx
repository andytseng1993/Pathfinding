import { useEffect, useState } from 'react'
import Node from '../components/Node'
import classes from './Path.module.css'
import { motion } from 'framer-motion'
import { dijkstra, getShortestPathOrder } from '../algorithms/Dijkstra'
import { primAlgorithm } from '../mazeAlgorithms/PrimMaze'
import { aStar } from '../algorithms/AStar'

const Path = () => {
	const [pathes, setPathes] = useState([])
	const [paintWallBtn, setPaintWallBtn] = useState(false)
	const [paintWall, setPaintWall] = useState(false)
	const [startBtn, setStartBtn] = useState(false)
	const [startNode, setStartNode] = useState([])
	const [endBtn, setEndBtn] = useState(false)
	const [endNode, setEndNode] = useState([])
	const [warning, setWarning] = useState('')
	const [beforeRunNode, setBeforeRunNode] = useState([])
	const [afterRun, setAfterRun] = useState(false)
	const [pathNum, setPathNum] = useState(0)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		let nodes = []
		for (let row = 0; row < 15; row++) {
			let currentRow = []
			for (let col = 0; col < 49; col++) {
				currentRow.push(currentNode(row, col))
			}
			nodes.push(currentRow)
		}
		setPathes(nodes)
	}, [])

	const currentNode = (row, col, isWall = false) => {
		return {
			row,
			col,
			isStart: false,
			isFinish: false,
			isWall,
			gScore: Infinity,
			distance: Infinity,
			isVisited: false,
			previousNode: null,
			isAnimated: false,
			isShortPath: false,
			isMazeVisited: false,
		}
	}
	const setToDefault = () => {
		setStartBtn(false)
		setEndBtn(false)
		setPaintWallBtn(false)
		setStartNode([])
		setEndNode([])
		setWarning('')
		setBeforeRunNode([])
		setAfterRun(false)
		setPathNum(0)
	}
	const handleChangeNode = (
		row,
		col,
		isStart = false,
		isFinish = false,
		isWall = false
	) => {
		let newPathes = JSON.parse(JSON.stringify(pathes))
		if (isStart) {
			if (startNode.length > 0) {
				newPathes[startNode[0]][startNode[1]].isStart = false
				newPathes[startNode[0]][startNode[1]].distance = Infinity
			}
			newPathes[row][col].isWall = false
			newPathes[row][col].isStart = true
			newPathes[row][col].distance = 0
			newPathes[row][col].gScore = 0
		}
		if (isFinish) {
			if (endNode.length > 0) newPathes[endNode[0]][endNode[1]].isFinish = false
			newPathes[row][col].isFinish = true
			newPathes[row][col].isWall = false
		}
		if (isWall) {
			newPathes[row][col].isWall = !newPathes[row][col].isWall
		}
		setPathes(newPathes)
		if (isStart) setStartNode([row, col])
		if (isFinish) setEndNode([row, col])
		setStartBtn(false)
		setEndBtn(false)
		setWarning('')
	}

	const handleSetBtn = (string) => {
		if (afterRun) {
			setPathes(JSON.parse(JSON.stringify(beforeRunNode)))
			setAfterRun(false)
			setPathNum(0)
		}
		if (string === 'start') {
			setStartBtn(!startBtn)
			setEndBtn(false)
			setPaintWallBtn(false)
		}
		if (string === 'end') {
			setStartBtn(false)
			setEndBtn(!endBtn)
			setPaintWallBtn(false)
		}
		if (string === 'wall') {
			setStartBtn(false)
			setEndBtn(false)
			setPaintWallBtn(!paintWallBtn)
		}
		setWarning('')
	}
	const handleStopPainting = () => {
		setPaintWall(false)
	}
	const handleClear = () => {
		let nodes = []
		for (let row = 0; row < 15; row++) {
			let currentRow = []
			for (let col = 0; col < 49; col++) {
				currentRow.push(currentNode(row, col))
			}
			nodes.push(currentRow)
		}
		setPathes(nodes)
		setToDefault()
	}
	const handleRunDijkstraBtn = (algorithm) => {
		if (afterRun) {
			setPathes(() => JSON.parse(JSON.stringify(beforeRunNode)))
			setAfterRun(false)
			setPathNum(0)
		} else {
			setBeforeRunNode(() => JSON.parse(JSON.stringify(pathes)))
		}
		setWarning('')
		setStartBtn(false)
		setEndBtn(false)
		setPaintWallBtn(false)
		let visitedNodesInOrder
		if (algorithm === 'Dijkstra') {
			visitedNodesInOrder = dijkstra(pathes, startNode, endNode)
		}
		if (algorithm === 'AStar') {
			visitedNodesInOrder = aStar(pathes, startNode, endNode)
		}
		setAfterRun(true)
		// if dones not set start or end node
		if (typeof visitedNodesInOrder === 'string') {
			return setWarning(visitedNodesInOrder)
		}
		// if cannot find the end node
		if (typeof visitedNodesInOrder.warning === 'string') {
			for (let i = 0; i <= visitedNodesInOrder.visitedPath.length; i++) {
				if (i !== visitedNodesInOrder.visitedPath.length) {
					setTimeAnimate(i, visitedNodesInOrder.visitedPath, true, false, 10)
				} else {
					setTimeout(() => {
						setWarning(visitedNodesInOrder.warning)
					}, 10 * i)
				}
			}
		} else {
			const shortestPathOrder = getShortestPathOrder(visitedNodesInOrder.pop())
			nodeAnimation(visitedNodesInOrder, shortestPathOrder)
		}
	}
	const nodeAnimation = (nodesPath, shortestPathOrder) => {
		for (let i = 0; i <= nodesPath.length; i++) {
			if (i !== nodesPath.length) {
				setTimeAnimate(i, nodesPath, true, false, 10)
			} else {
				//shortest path
				setTimeout(() => {
					for (let n = 0; n < shortestPathOrder.length; n++) {
						setTimeAnimate(n, shortestPathOrder, true, true, 50)
						setTimeout(() => {
							setPathNum((pre) => pre + 1)
						}, 50 * n)
					}
				}, 10 * i)
			}
		}
	}
	const setTimeAnimate = (
		i,
		nodes,
		isAnimated = false,
		isShortPath = false,
		time
	) => {
		setTimeout(() => {
			const node = nodes[i]
			setPathes((pre) => {
				return pre.map((row) => {
					return row.map((cell) =>
						cell.row === node.row && cell.col === node.col
							? { ...cell, isAnimated, isShortPath }
							: cell
					)
				})
			})
		}, time * i)
	}
	const handleMazeGeneratorBtn = () => {
		setIsLoading(true)
		let nodes = []
		for (let row = 0; row < 15; row++) {
			let currentRow = []
			for (let col = 0; col < 49; col++) {
				currentRow.push(currentNode(row, col, true))
			}
			nodes.push(currentRow)
		}
		setPathes(nodes)
		setToDefault()
		const maze = primAlgorithm(nodes)

		for (let i = 0; i <= maze.length; i++) {
			if (i === maze.length) {
				setTimeout(() => {
					const randomStart = maze.splice(
						Math.floor(Math.random() * maze.length),
						1
					)[0]
					randomStart.isStart = true
					const randomEnd = maze.splice(
						Math.floor(Math.random() * maze.length),
						1
					)[0]
					randomEnd.isFinish = true
					setPathes((pre) => {
						return pre.map((row) => {
							return row.map(
								(cell) =>
									(cell.row === randomStart.row && cell.col === randomStart.col
										? randomStart
										: cell) ||
									(cell.row === randomEnd.row && cell.col === randomEnd.col
										? randomEnd
										: cell)
							)
						})
					})
					setStartNode([randomStart.row, randomStart.col])
					setEndNode([randomEnd.row, randomEnd.col])
					setIsLoading(false)
				}, 25 * i)
			} else {
				const node = maze[i]
				setTimeout(() => {
					setPathes((pre) => {
						return pre.map((row) => {
							return row.map((cell) =>
								cell.row === node.row && cell.col === node.col ? node : cell
							)
						})
					})
				}, 25 * i)
			}
		}
	}

	return (
		<>
			<h1 style={{ marginBottom: '10px' }}>Path Finding</h1>
			<div className={classes.navBar}>
				<div className={classes.nav}>
					<button
						className={`${classes.btn} ${startBtn ? classes.btnActived : ''}`}
						onClick={() => handleSetBtn('start')}
					>
						{startBtn ? 'Setting start node' : 'Set start node'}
					</button>
					<button
						className={`${classes.btn} ${endBtn ? classes.btnActived : ''}`}
						onClick={() => handleSetBtn('end')}
					>
						{endBtn ? 'Setting end node' : 'Set end node'}
					</button>
					<button
						className={`${classes.btn} ${
							paintWallBtn ? classes.btnActived : ''
						}`}
						onClick={() => handleSetBtn('wall')}
					>
						{paintWallBtn ? 'Painting wall..' : 'Paint wall'}
					</button>
					<button className={classes.btn} onClick={() => handleClear(false)}>
						Clear
					</button>
					<button
						className={classes.btn}
						onClick={() => handleRunDijkstraBtn('Dijkstra')}
					>
						Run dijkstra Algorithm
					</button>
					<button
						className={classes.btn}
						onClick={() => handleRunDijkstraBtn('AStar')}
					>
						Run A* Algorithm
					</button>
					<div className={warning ? classes.warning : ''}>
						{warning ? warning : null}
					</div>
					<div className={pathNum ? classes.pathNum : ''}>
						{pathNum ? (
							<>
								Path number : <strong>{pathNum}</strong>
							</>
						) : null}
					</div>
				</div>
				<div className={classes.nav}>
					<button
						className={classes.btn}
						onClick={handleMazeGeneratorBtn}
						disabled={isLoading}
					>
						{isLoading ? 'Generating...' : 'Maze generator'}
					</button>
				</div>
			</div>
			<div className={classes.nodes} onMouseLeave={handleStopPainting}>
				{pathes.map((path, index) => (
					<motion.div
						key={index}
						className={classes.row}
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: {
								duration: 0.5,
								delay: 0.1 + index / 20,
							},
						}}
					>
						<Node
							path={path}
							handleChangeNode={handleChangeNode}
							paintWallBtn={paintWallBtn}
							paintWall={paintWall}
							setPaintWall={setPaintWall}
							startBtn={startBtn}
							endBtn={endBtn}
						/>
					</motion.div>
				))}
			</div>
		</>
	)
}

export default Path
