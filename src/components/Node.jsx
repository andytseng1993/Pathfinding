import classes from './Node.module.css'

const Node = ({ path }) => {
	return path.map((col, index) => (
		<div key={index} className={classes.node}></div>
	))
}

export default Node
