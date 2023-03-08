import { useEffect, useState } from 'react'
import Node from '../components/Node'
import classes from './Path.module.css'
import { motion } from 'framer-motion'

const Path = () => {
	const [pathes, setPathes] = useState([])
	const [paintWallBtn, setPaintWallBtn] = useState(false)
	const [paintWall, setPaintWall] = useState(false)

	useEffect(() => {
		let nodes = []
		for (let row = 0; row < 15; row++) {
			let currentRow = []
			for (let col = 0; col < 50; col++) {
				const currentNode = {
					row,
					col,
					isStart: row === 8 && col === 5,
					isFinish: row === 8 && col === 45,
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
		}
		newPathes[row].splice(col, 1, newNode)
		setPathes(newPathes)
	}
	const handlePaintWall = () => {
		setPaintWallBtn(!paintWallBtn)
	}
	const handleStopPainting = () => {
		setPaintWall(false)
	}
	return (
		<>
			<h1>Path Finding</h1>
			<button onClick={handlePaintWall}>
				{paintWallBtn ? 'Painting wall..' : 'Paint wall'}
			</button>
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
						/>
					</motion.div>
				))}
			</div>
		</>
	)
}

export default Path
