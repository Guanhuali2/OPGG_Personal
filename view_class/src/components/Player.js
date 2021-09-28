import React, { Component } from 'react'
import champion from './champion';
import './general.css';
import './table.css';

class player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            'server': '',
            'name': '',
            'update': false,
            'pos': -1
        }
        this.clean = this.clean.bind(this)
        this.open = this.open.bind(this)
    }

    inputChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getProfile() {
        if (!this.state.datas) return null;  
        if (this.state.datas.nope){
            return null
        }
            return(
                <center>
                    <div class="box">
                        <div class="profile">
                            <div>                    
                                <span>{this.state.datas.profile.name}</span>
                            </div>
                            <div>
                                <span>level:{this.state.datas.profile.summonerLevel}</span>
                            </div>
                            <div>
                                <span>Recent Winrate:{this.state.datas.winrate}</span>
                            </div>
                            <div>
                                <span>Recent Used Champion:{this.state.datas.champion[0]},{this.state.datas.champion[1]}</span>
                            </div>
                        </div>
                        <div>
                            {this.getRank()}
                        </div>
                    </div>
                </center>
            )
            
    }

    hide_head(index){
        var rows = this.state.datas.match[index]
        if (this.state.pos == index){
            return Object.keys(rows).map((row, index) =>(
                <tr>
                    <td>
                        {rows[index].name}
                    </td>
                    <td>
                        <img src={process.env.PUBLIC_URL + '/champion/'+rows[index].champion+'.png'} 
                            style={{width:"30px", height:"30px"}}/>
                        {rows[index].champion}
                    </td>
                    <td>
                        {rows[index].win}
                    </td>
                    <td>
                        {rows[index].kills}
                    </td>
                    <td>
                        {rows[index].deaths}
                    </td>
                    <td>
                        {rows[index].assists}
                    </td>
                    <td>
                        {rows[index].totalDamageDealt}
                    </td>
                    <td>
                        {rows[index].goldEarned}
                    </td>
                    <td>
                        {/* {console.log(rows[index])} */}
                        <img src={process.env.PUBLIC_URL + '/item/'+rows[index].item0+'.png'} 
                            style={{width:"30px", height:"30px"}}/>
                        <img src={process.env.PUBLIC_URL + '/item/'+rows[index].item1+'.png'} 
                            style={{width:"30px", height:"30px"}}/>
                    </td>
                </tr>
                )
            )
        }else{
            return null
        }
    }

    open_hide(index){
        var rows = this.state.datas.match[index]
        if (this.state.pos == index){
            return (
                <tr>
                    <th>Player Name</th>
                    <th>Champion</th>
                    <th>Game Result</th>
                    <th>Kill</th>
                    <th>Death</th>
                    <th>Assists</th>
                    <th>Total Damage Dealt</th>
                    <th>Gold Eearned</th>
                    <th>Item Built</th>
                </tr>
                )
        }else{
            return null
        }
    }

    createTable(rows){
        return Object.keys(rows).map((row, index) =>(
            <tr>
                hello
            </tr>
            )
        )
    }

    open(index){
        this.setState({pos:index})
    }

    hide(index){
        this.setState({pos:-1})
    }

    getMatch(){
        if (!this.state.datas) return null; 
        if (this.state.datas.nope){
            return(
                <center>
                    No such Name
                </center>
            )
        }
        return Object.keys(this.state.datas.match).map((row, index) => (
            <div>
                <h1>
                </h1>
                <h1></h1>
                <section>
                <div class="tbl-header">
                    <table cellpadding="0" cellspacing="0" border="0">
                    <thead>
                        <tr>
                        <th>
                            <img src={process.env.PUBLIC_URL + '/champion/'+this.state.datas.match[index][0].champion+'.png'} 
                                    style={{width:"100px", height:"100px"}}/>
                        </th>
                        <th>
                            {this.state.datas.match[index][0].kills}/{this.state.datas.match[index][0].deaths}/{this.state.datas.match[index][0].assists}
                        </th>
                        <th>
                            <button className = "big-button" onClick={()=>this.open(index)}>Open</button>
                            <button className = "big-button" onClick={()=>this.hide(index)}>Hide</button>
                        </th>
                        </tr>
                    </thead>
                    </table>
                </div>
                </section>
                <table class="fl-table">
                    <thead>
                        {this.open_hide(index)}
                    </thead>
                    <tbody>
                        {this.hide_head(index)}
                    </tbody>
                </table>
            </div>
        ))
    }

    getRank() {
        if (!this.state.datas) return null;  //added this line
        var soloRank;
        var flexRank;
        var soloQ;
        var flexQ;
        var so_league_points;
        var flex_league_points;
        var solo_winRate = 0;
        var flex_winRate = 0;
        if (this.state.datas.rank.length === 1){
            soloRank = "No Such Information"
            soloQ = "No Such Information"
            so_league_points = "No Such Information"
            flexRank = this.state.datas.rank[0].tier + ' ' + this.state.datas.rank[0].rank
            flexQ = this.state.datas.rank[0].queueType
            flex_league_points = this.state.datas.rank[0].leaguePoints
            flex_winRate = Math.round((this.state.datas.rank[0].wins/(this.state.datas.rank[0].wins + this.state.datas.rank[0].losses))*100)
            return(
                <div>
                    <div class='rank'>
                        <span>{flexQ}</span>
                        <div>
                            <span>Rank:{flexRank}</span>
                        </div>
                        <div>
                            <span>Points:{flex_league_points}</span>
                        </div>
                        <div>
                            <spa>Winrate:{flex_winRate}%</spa>
                        </div>
                    </div>
                </div>
            )
        }else if(this.state.datas.rank.length === 0){
            soloRank = "No Such Information"
            soloQ = "No such Information"
            so_league_points = "No Such Information"
            flexRank = "No such Information"
            flexQ = "No such Information"
            flex_league_points = "No such Information"
            return(
                <div>
                </div>
            )
        }else{
            soloRank = this.state.datas.rank[1].tier + ' ' + this.state.datas.rank[1].rank
            soloQ = this.state.datas.rank[1].queueType
            so_league_points = this.state.datas.rank[1].leaguePoints
            solo_winRate = Math.round((this.state.datas.rank[1].wins/(this.state.datas.rank[1].wins + this.state.datas.rank[1].losses))*100)
            flexRank = this.state.datas.rank[0].tier + ' ' + this.state.datas.rank[0].rank
            flexQ = this.state.datas.rank[0].queueType
            flex_league_points = this.state.datas.rank[0].leaguePoints
            flex_winRate = Math.round((this.state.datas.rank[0].wins/(this.state.datas.rank[0].wins + this.state.datas.rank[0].losses))*100)
            return(
                <div>
                    <div class='rank'>
                        <span>{soloQ}</span>
                        <div>
                            <span>Rank:{soloRank}</span>
                        </div>
                        <div>
                            <span>Points:{so_league_points}</span>
                        </div>
                        <div>
                            <span>WinRate:{solo_winRate}%</span>
                        </div>
                    </div>
                    <div class='rank'>
                        <span>{flexQ}</span>
                        <div>
                            <span>Rank:{flexRank}</span>
                        </div>
                        <div>
                            <span>Points:{flex_league_points}</span>
                        </div>
                        <div>
                            <spa>Winrate:{flex_winRate}%</spa>
                        </div>
                    </div>
                </div>
            )
        }
    }

    clean(){
        this.setState(
            {
                server: '',
                name: '',
                datas: null,
                update:false
            }
        )
    }

    render(){
        if (this.state.update){
            return(
                <div>
                    <center>
                    <div class="form-group">
                        <input class="form-field" name="server" placeholder="Plz Enter Server" value={this.state.server} onChange={this.inputChange}></input>
                        <input class="form-field" name="name" placeholder="Plz Enter Player Name" value={this.state.name} onChange={this.inputChange}></input>
                    </div>
                    <button class='btn' onClick={
                        async () => {
                            const Server = this.state.server;
                            const Name = this.state.name;
                            const url = '/'+Server+'/'+Name;
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
                    }><span>Search</span></button>
                    <button class='btn' onClick={this.clean}><span>Clear</span></button>
                    </center>
                    <center>Loading...</center>
                </div>    
            )
        }
        else{
            return(
                <div>
                    <center>
                    <div class="form-group">
                        <input class="form-field" name="server" placeholder="Plz Enter Server" value={this.state.server} onChange={this.inputChange}></input>
                        <input class="form-field" name="name" placeholder="Plz Enter Player Name" value={this.state.name} onChange={this.inputChange}></input>
                    </div>
                    <button class='btn' onClick={
                        async () => {
                            const Server = this.state.server;
                            const Name = this.state.name;
                            const url = '/'+Server+'/'+Name;
                            this.setState({update: true})
                            fetch(url, {
                                method: "GET"
                            }).then(res => res.json().then(
                                data => {
                                    this.setState(
                                        { 
                                            datas: data,
                                            update: false
                                        }
                                    )
                                }
                            ))
                            fetch(url,{
                                method:"PUT"
                            })
                        }
                    }><span>Search</span></button>
                    <button class='btn' onClick={this.clean}><span>Clear</span></button>
                    </center>
                    <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
                        {this.getProfile()}
                    </div>
                    {this.getMatch()}
                </div>
            )
        }
    }
}
export default player
