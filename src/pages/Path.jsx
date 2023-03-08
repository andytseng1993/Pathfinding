import { useEffect, useState } from 'react'
import Node from '../components/Node'
import classes from './Path.module.css'

const Path = () => {
	const [pathes, setPathes] = useState([])
	useEffect(() => {
		let nodes = []
		for (let row = 0; row < 15; row++) {
			let currentRow = []
			for (let col = 0; col < 50; col++) {
				currentRow.push([])
			}
			nodes.push(currentRow)
		}
		setPathes(nodes)
	}, [])

	return (
		<>
			<h1>Path Finding</h1>
			<div>
				{pathes.map((path, index) => (
					<div key={index} className={classes.row}>
						<Node path={path} />
					</div>
				))}
			</div>
		</>
	)
}

export default Path
