import React, { Component } from 'react'
import './general.css';


class challenger extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    shows() {
        if (!this.state.datas) return null;
        return Object.keys(this.state.datas.entries).map((row, index) => (
            // <tr>
            // <th scope="row">{index+1}</th>
            // <td>{this.state.datas.entries[index].summonerName}</td>
            // <td>Challenger</td>
            // <td>{this.state.datas.entries[index].leaguePoints}&nbsp;LP</td>
            //     <td>
            //     <div className = "winratio-graph">
            //         <div className = "winratio-graph__fill winratio-graph__fill--left" style = {{width: Math.floor(this.state.datas.entries[index].wins/(this.state.datas.entries[index].wins+this.state.datas.entries[index].losses)*100) + '%'}}></div>
            //         <div className = "winratio-graph__text winratio-graph__text--left"> {this.state.datas.entries[index].wins} </div>
            //         <div className = "winratio-graph__fill winratio-graph__fill--right"></div>
            //         <div className = "winratio-graph__text winratio-graph__text--right"> {this.state.datas.entries[index].losses} </div>
            //     </div>
            //     </td>
            // </tr>
            <tr>
                <td key={index + 'a'}>
                    {index + 1}
                </td>
                <td key={index + 'b'}>
                    {this.state.datas.entries[index].summonerName}
                </td>
                <td key={index + 'c'}>
                    {this.state.datas.entries[index].leaguePoints}
                </td>
                <td key={index + 'd'}>
                    {this.state.datas.entries[index].wins}
                </td>
                <td key={index + 'e'}>
                    {this.state.datas.entries[index].losses}
                </td>
                <td>
                    <div className="winratio-graph">
                        <div className="winratio-graph__fill winratio-graph__fill--left" style={{ width: Math.floor(this.state.datas.entries[index].wins / (this.state.datas.entries[index].wins + this.state.datas.entries[index].losses) * 100) + '%' }}></div>
                        <div className="winratio-graph__text winratio-graph__text--left"> {this.state.datas.entries[index].wins} </div>
                        <div className="winratio-graph__fill winratio-graph__fill--right"></div>
                        <div className="winratio-graph__text winratio-graph__text--right"> {this.state.datas.entries[index].losses} </div>
                    </div>
                </td>
            </tr>
        ))
    }
    getTableHead() {
        if (!this.state.datas) return null;
        return (
            <tr>
                <th>
                    Rank
                </th>
                <th>
                    Name
                </th>
                <th>
                    Points
                </th>
                <th>
                    Wins
                </th>
                <th>
                    Loses
                </th>
                <th>
                    Ratio Graph
                </th>
            </tr>
        )

    }

    render() {
        return (
            <div>
                <button class="btn btn--alpha" onClick={
                    async () => {
                        const url = '/solo';
                        fetch(url, {
                            method: "GET"
                        }).then(res => res.json().then(
                            data => {
                                this.setState(
                                    { datas: data }
                                )
                            }
                        ))
                    }
                }><span>Solo Queue</span></button>
                <br></br>
                <button class="btn btn--beta" onClick={
                    async () => {
                        const url = '/flex';
                        fetch(url, {
                            method: "GET"
                        }).then(res => res.json().then(
                            data => {
                                this.setState(
                                    { datas: data }
                                )
                            }
                        ))
                    }
                }><span>Flex Queue</span></button>
                <center>
                    <h1 id='title' >Challenger</h1>
                    <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                        {this.getTableHead()}
                        {this.shows()}
                    </div>
                </center>
            </div>
        )
    }
}
export default challenger
