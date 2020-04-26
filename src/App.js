import React from 'react';
import './styles.css';
import { makeStyles } from '@material-ui/core/styles';

class Square extends React.Component {
	constructor(props) {
		super(props);
		console.log('sdf');
		this.changeState = this.changeState.bind(this);
	}

	changeState(event) {
		this.props.onClick();
	}

	getPlayerClass() {
		if (this.props.value) {
			return this.props.value === 'X' ? 'red' : 'green';
		}
		return '';
	}
	render() {
		return (
			<button
				className={'square ' + this.getPlayerClass()}
				onClick={this.changeState}
			>
				{this.props.value}
			</button>
		);
	}
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true
		};
	}

	handleClick(i) {
		const squares = this.state.squares.slice();
		if (this.calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.getPlayer();
		this.setState({
			squares: squares,
			xIsNext: !this.state.xIsNext
		});
	}

	renderSquare(i) {
		return (
			<Square
				value={this.state.squares[i]}
				onClick={() => this.handleClick(i)}
				player={this.getPlayer()}
			/>
		);
	}

	getPlayer() {
		return this.state.xIsNext ? 'X' : 'O';
	}

	calculateWinner(squares) {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];

		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return squares[a];
			}
		}
		return null;
	}

	render() {
		const winner = this.calculateWinner(this.state.squares);

		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + this.getPlayer();
		}

		// const status = 'Next player: ' + this.getPlayer();

		function getWinnerClass(value) {
			if (value) {
				return value === 'X' ? 'red' : 'green';
			}
			return '';
		}

		function getPlayerClass(value) {
			if (value) {
				return value === 'X' ? 'red-status' : 'green-status';
			}
			return '';
		}

		return (
			<div>
				<div
					className={
						getPlayerClass(this.getPlayer()) +
						' ' +
						getWinnerClass(this.calculateWinner(this.state.squares))
					}
				>
					{status}
				</div>
				<div className="board">
					<div className="board-row">
						{this.renderSquare(0)}
						{this.renderSquare(1)}
						{this.renderSquare(2)}
					</div>
					<div className="board-row">
						{this.renderSquare(3)}
						{this.renderSquare(4)}
						{this.renderSquare(5)}
					</div>
					<div className="board-row">
						{this.renderSquare(6)}
						{this.renderSquare(7)}
						{this.renderSquare(8)}
					</div>
				</div>
			</div>
		);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

// ========================================
const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	container: {
		display: 'grid',
		gridTemplateColumns: 'repeat(12, 1fr)',
		gridGap: theme.spacing(3)
	}
}));

export default function App() {
	const classes = useStyles();
	return <Game />;
}
