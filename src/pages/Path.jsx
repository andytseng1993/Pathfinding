import { useEffect, useState } from 'react'
import Node from '../components/Node'
import classes from './Path.module.css'
import { motion } from 'framer-motion'
import { dijkstra } from '../algorithms/Dijkstra'

const Path = () => {
	const [pathes, setPathes] = useState([])
	const [paintWallBtn, setPaintWallBtn] = useState(false)
	const [paintWall, setPaintWall] = useState(false)
	const [startBtn, setStartBtn] = useState(false)
	const [startNode, setStartNode] = useState([])
	const [endBtn, setEndBtn] = useState(false)
	const [endNode, setEndNode] = useState([])
	console.log(startNode, endNode)
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
		const newNode = {
			row,
			col,
			isStart,
			isFinish,
			isWall,
			distance: Infinity,
			isVisited: false,
			previousNode: null,
		}
		if (isStart && startNode.length > 0) {
			newPathes[startNode[0]][startNode[1]].isStart = false
			newPathes[row][col].isStart = true
		}
		if (isFinish && endNode.length > 0) {
			newPathes[endNode[0]][endNode[1]].isFinish = false
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
			setStartBtn(true)
			setEndBtn(false)
			setPaintWallBtn(false)
		}
		if (string === 'end') {
			setStartBtn(false)
			setEndBtn(true)
			setPaintWallBtn(false)
		}
		if (string === 'wall') {
			setStartBtn(false)
			setEndBtn(false)
			setPaintWallBtn(true)
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
		console.log(dijkstra())
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
