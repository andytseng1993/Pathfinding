import { useEffect, useState } from 'react'
import Node from '../components/Node'
import classes from './Path.module.css'
import { motion } from 'framer-motion'
import { dijkstra, getShortestPathOrder } from '../algorithms/Dijkstra'

const Path = () => {
	const [pathes, setPathes] = useState([])
	const [paintWallBtn, setPaintWallBtn] = useState(false)
	const [paintWall, setPaintWall] = useState(false)
	const [startBtn, setStartBtn] = useState(false)
	const [startNode, setStartNode] = useState([])
	const [endBtn, setEndBtn] = useState(false)
	const [endNode, setEndNode] = useState([])

	useEffect(() => {
		let nodes = []
		for (let row = 0; row < 15; row++) {
			let currentRow = []
			for (let col = 0; col < 50; col++) {
				const currentNode = {
					row,
					col,
					isStart: false,
					isFinish: false,
					isWall: false,
					distance: Infinity,
					isVisited: false,
					previousNode: null,
					isAnimated: false,
					isShortPath: false,
				}
				currentRow.push(currentNode)
			}
			nodes.push(currentRow)
		}
		setPathes(nodes)
	}, [])
	const handleChangeNode = (
		row,
		col,
		isStart = false,
		isFinish = false,
		isWall = false
	) => {
		let newPathes = [...pathes]

		if (isStart) {
			if (startNode.length > 0) {
				newPathes[startNode[0]][startNode[1]].isStart = false
				newPathes[startNode[0]][startNode[1]].distance = Infinity
			}
			newPathes[row][col].isStart = true
			newPathes[row][col].distance = 0
		}
		if (isFinish) {
			if (endNode.length > 0) newPathes[endNode[0]][endNode[1]].isFinish = false
			newPathes[row][col].isFinish = true
		}
		if (isWall) {
			newPathes[row][col].isWall = !newPathes[row][col].isWall
		}
		setPathes(newPathes)
		if (isStart) setStartNode([row, col])
		if (isFinish) setEndNode([row, col])
		setStartBtn(false)
		setEndBtn(false)
	}

	const handleSetBtn = (string) => {
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
	}
	const handleStopPainting = () => {
		setPaintWall(false)
	}
	const handleClear = () => {
		let nodes = []
		for (let row = 0; row < 15; row++) {
			let currentRow = []
			for (let col = 0; col < 50; col++) {
				const currentNode = {
					row,
					col,
					isStart: false,
					isFinish: false,
					isWall: false,
					distance: Infinity,
					isVisited: false,
					previousNode: null,
					isAnimated: false,
					isShortPath: false,
				}
				currentRow.push(currentNode)
			}
			nodes.push(currentRow)
		}
		setPathes(nodes)
		setStartBtn(false)
		setEndBtn(false)
		setPaintWallBtn(false)
	}
	const handleRunDijkstraBtn = () => {
		const visitedNodesInOrder = dijkstra(pathes, startNode, endNode)
		const shortestPathOrder = getShortestPathOrder(visitedNodesInOrder.pop())
		nodeAnimation(visitedNodesInOrder, shortestPathOrder)
	}
	const nodeAnimation = (nodesPath, shortestPathOrder) => {
		for (let i = 0; i <= nodesPath.length; i++) {
			if (i !== nodesPath.length) {
				setTimeAnimate(i, nodesPath, true, false, 10)
			} else {
				setTimeout(() => {
					for (let n = 0; n < shortestPathOrder.length; n++) {
						setTimeAnimate(n, shortestPathOrder, true, true, 50)
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
	return (
		<>
			<h1 style={{ marginBottom: '10px' }}>Path Finding</h1>
			<div style={{ marginBottom: '20px' }}>
				<button onClick={() => handleSetBtn('start')}>
					{startBtn ? 'Setting start node' : 'Set start node'}
				</button>
				<button onClick={() => handleSetBtn('end')}>
					{endBtn ? 'Setting end node' : 'Set end node'}
				</button>
				<button onClick={() => handleSetBtn('wall')}>
					{paintWallBtn ? 'Painting wall..' : 'Paint wall'}
				</button>
				<button onClick={handleClear}>Clear</button>
				<button onClick={handleRunDijkstraBtn}>Run dijkstra</button>
			</div>
			<div
				style={{
					display: 'block',
					width: '1700px',
					marginLeft: 'auto',
					marginRight: 'auto',
				}}
				onMouseLeave={handleStopPainting}
			>
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
