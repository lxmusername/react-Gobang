import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

//只有 render的组件 可以使用函数定义
const Square = (props) => {
    return (
        <button className="square"
            onClick={props.clickHandle}>
            {props.value}
        </button>
    )
}
class Square1 extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         value: this.props.value,
    //     }
    //     this.changeBtnValue = this.changeBtnValue.bind(this);
    // }
    // changeBtnValue() {
    //     this.setState({
    //         value: 'x'
    //     })
    // }
    render() {
        return (
            // <button className="square"
            //     onClick={this.changeBtnValue}>
            //     {this.state.value}
            // </button>
            <button className="square" onClick={() => this.props.clickHandle()}>
                {this.props.value}
            </button>
        );
    }
}

class Board extends React.Component {
    constructor() {
        super()
        this.state = {
            square: Array(9).fill(''),
            nextStep:true,//添加控制 下一步 棋手
        }
    }
    clickHandle(i) {
        const squares = [...this.state.square];
        console.log(squares)
        squares[i] = this.state.nextStep?'*':'o';
        
        this.setState({
            square: squares,
            nextStep:!this.state.nextStep
        })
    }
    renderSquare(i) {
        return (
            //1 使用箭头函数 解决this绑定问题
            //2 可以在 constructor中 重新绑定this指向
            <Square value={this.state.square[i]} clickHandle={() => this.clickHandle(i)} />
        );
    }

    render() {
        const status = `Next player: ${this.state.nextStep?'*':'o'}`;

        return (
            <div>
                <div className="status">{status}</div>
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

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
