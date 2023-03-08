import classes from './Node.module.css'
import { motion } from 'framer-motion'
import { useState } from 'react'

const Node = ({
	path,
	handleChangeNode,
	paintWallBtn,
	paintWall,
	setPaintWall,
}) => {
	const handleClick = (row, col) => {
		const isStart = false
		const isFinish = true
		handleChangeNode(row, col, isStart, isFinish)
	}
	const handlePaintWallStart = () => {
		if (!paintWallBtn) return
		setPaintWall(true)
	}
	const handleMove = (row, col, isWall) => {
		if (isWall) return
		if (!paintWallBtn) return
		if (!paintWall) return
		handleChangeNode(row, col, false, false, true)
	}
	const handlePaintWallEnd = () => {
		if (!paintWallBtn) return
		setPaintWall(false)
	}
	console.log(1)
	return path.map((col, index) => (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: {
					duration: 0.5,
					delay: 0.1 + index / 30,
				},
			}}
			transition={{ duration: 0.3 }}
			viewport={{ once: true }}
			whileHover={{
				scale: 1.1,
				transition: { duration: 0.1 },
			}}
			whileTap={{
				scale: 0.9,
				transition: { duration: 0.1 },
			}}
			key={index}
			className={`${classes.node} ${
				col.isStart
					? classes.start
					: col.isFinish
					? classes.finish
					: col.isWall
					? classes.wall
					: ''
			}`}
			onClick={() => handleClick(col.row, col.col)}
			onMouseDown={handlePaintWallStart}
			onMouseMove={() => handleMove(col.row, col.col, col.isWall)}
			onMouseUp={handlePaintWallEnd}
		></motion.div>
	))
}

export default Node
