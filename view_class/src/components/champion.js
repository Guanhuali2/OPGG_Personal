import React, { Component } from 'react'
import './table.css';

class champion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pos: "None",
            expand: -1
        }
        this.set_top = this.set_top.bind(this)
        this.set_mid = this.set_mid.bind(this)
        this.set_sup = this.set_sup.bind(this)
        this.set_jug = this.set_jug.bind(this)
        this.set_adc = this.set_adc.bind(this)
        this.clean = this.clean.bind(this)
        this.open = this.open.bind(this)
        this.start()
    }

    open() {

    }

    clean() {
        this.setState(
            {
                pos: "None"
            }
        )
    }

    set_top() {
        this.setState({ pos: "Top" })
    }

    set_mid() {
        this.setState({ pos: "Mid" })
    }

    set_adc() {
        this.setState({ pos: "Adc" })
    }

    set_sup() {
        this.setState({ pos: "Sup" })
    }

    set_jug() {
        this.setState({ pos: "Jug" })
    }

    async start() {
        if (!this.state.datas) {
            var url = "/Leblanc"
            fetch(url, {
                method: "GET"
            }).then(res => res.json().then(
                data => {
                    this.setState(
                        {
                            datas: data,
                        }
                    )
                }
            ))
            return null
        } else {
            return null
        }
    }


    open(index) {
        this.setState({ expand: index.name })
    }

    hide(index) {
        this.setState({ expand: -1 })
    }

    hide_head(index) {
        var rows = index
        console.log(rows)
        if (this.state.expand == index.name) {
            return (
                <tr>
                    <td>
                        {rows.stats.hp}
                    </td>
                    <td>
                        {rows.stats.hpperlevel}
                    </td>
                    <td>
                        {rows.stats.mp}
                    </td>
                    <td>
                        {rows.stats.mpperlevel}
                    </td>
                    <td>
                        {rows.stats.armor}
                    </td>
                    <td>
                        {rows.stats.armorperlevel}
                    </td>
                    <td>
                        {rows.stats.spellblock}
                    </td>
                    <td>
                        {rows.stats.attackrange}
                    </td>
                    <td>
                        {rows.stats.hpregen}
                    </td>
                    <td>
                        {rows.stats.attackdamage}
                    </td>
                    <td>
                        {rows.stats.attackspeed}
                    </td>
                </tr>
            )
        } else {
            return null
        }
    }

    open_hide(index) {
        if (this.state.expand == index.name) {
            return (
                <tr>
                    <th>hp</th>
                    <th>hpperlevel</th>
                    <th>mp</th>
                    <th>mpperlevel</th>
                    <th>armor</th>
                    <th>armorperlevel</th>
                    <th>spellblock</th>
                    <th>attackrange</th>
                    <th>hpregen</th>
                    <th>attackdamage</th>
                    <th>attackspeed</th>
                </tr>
            )
        } else {
            return null
        }
    }

    get_table(key) {
        var rows = this.state.datas[key]
        if (rows) {
            return Object.keys(rows).map((row, index) => (
                <div>
                    <div class="table-row">
                        <div class="table-data">{rows[index].name}</div>
                        <div class="table-data">
                            <img src={process.env.PUBLIC_URL + '/champion/' + rows[index].name + '.png'}
                                style={{ width: "30px", height: "30px" }} />
                        </div>
                        <div class="table-data">{rows[index].info.attack}</div>
                        <div class="table-data">{rows[index].tags[0]}</div>
                        <div class="table-data">{rows[index].stats.hp}</div>
                        <div class="table-data">{rows[index].stats.movespeed}</div>
                    </div>
                    <button className="big-button" onClick={() => this.open(rows[index])}>Open</button>
                    <button className="big-button" onClick={() => this.hide(rows[index])}>Hide</button>
                    <table class="fl-table">
                        <thead>
                            {this.open_hide(rows[index])}
                        </thead>
                        <tbody>
                            {this.hide_head(rows[index])}
                        </tbody>
                    </table>
                </div>
            )
            )
        } else {
            return null
        }
    }

    lists() {
        console.log(this.state.datas)
        if (this.state.pos == "None") {
            return null;
        }
        if (this.state.pos == "Top") {
            return (
                <div>
                    <div class="container">
                        <div class="table">
                            <div class="table-header">
                                <div class="header__item"><a id="name" class="filter__link" href="#">Name</a></div>
                                <div class="header__item"><a id="wins" class="filter__link filter__link--number" href="#">Image</a></div>
                                <div class="header__item"><a id="draws" class="filter__link filter__link--number" href="#">Attack</a></div>
                                <div class="header__item"><a id="losses" class="filter__link filter__link--number" href="#">tags</a></div>
                                <div class="header__item"><a id="total" class="filter__link filter__link--number" href="#">Hp</a></div>
                                <div class="header__item"><a id="total" class="filter__link filter__link--number" href="#">Movement</a></div>
                            </div>
                            <div class="table-content">
                                {this.get_table("top")}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if (this.state.pos == "Mid") {
            return (
                <div>
                    <div class="container">
                        <div class="table">
                            <div class="table-header">
                                <div class="header__item"><a id="name" class="filter__link" href="#">Name</a></div>
                                <div class="header__item"><a id="wins" class="filter__link filter__link--number" href="#">Image</a></div>
                                <div class="header__item"><a id="draws" class="filter__link filter__link--number" href="#">Attack</a></div>
                                <div class="header__item"><a id="losses" class="filter__link filter__link--number" href="#">tags</a></div>
                                <div class="header__item"><a id="total" class="filter__link filter__link--number" href="#">Hp</a></div>
                                <div class="header__item"><a id="total" class="filter__link filter__link--number" href="#">Movement</a></div>
                            </div>
                            <div class="table-content">
                                {this.get_table("mid")}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if (this.state.pos == "Sup") {
            return (
                <div>
                    <div class="container">
                        <div class="table">
                            <div class="table-header">
                                <div class="header__item"><a id="name" class="filter__link" href="#">Name</a></div>
                                <div class="header__item"><a id="wins" class="filter__link filter__link--number" href="#">Image</a></div>
                                <div class="header__item"><a id="draws" class="filter__link filter__link--number" href="#">Attack</a></div>
                                <div class="header__item"><a id="losses" class="filter__link filter__link--number" href="#">tags</a></div>
                                <div class="header__item"><a id="total" class="filter__link filter__link--number" href="#">Hp</a></div>
                                <div class="header__item"><a id="total" class="filter__link filter__link--number" href="#">Movement</a></div>
                            </div>
                            <div class="table-content">
                                {this.get_table("sup")}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if (this.state.pos == "Jug") {
            return (
                <div>
                    <div class="container">
                        <div class="table">
                            <div class="table-header">
                                <div class="header__item"><a id="name" class="filter__link" href="#">Name</a></div>
                                <div class="header__item"><a id="wins" class="filter__link filter__link--number" href="#">Image</a></div>
                                <div class="header__item"><a id="draws" class="filter__link filter__link--number" href="#">Attack</a></div>
                                <div class="header__item"><a id="losses" class="filter__link filter__link--number" href="#">tags</a></div>
                                <div class="header__item"><a id="total" class="filter__link filter__link--number" href="#">Hp</a></div>
                                <div class="header__item"><a id="total" class="filter__link filter__link--number" href="#">Movement</a></div>
                            </div>
                            <div class="table-content">
                                {this.get_table("jug")}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        if (this.state.pos == "Adc") {
            return (
                <div>
                    <div class="container">
                        <div class="table">
                            <div class="table-header">
                                <div class="header__item"><a id="name" class="filter__link" href="#">Name</a></div>
                                <div class="header__item"><a id="wins" class="filter__link filter__link--number" href="#">Image</a></div>
                                <div class="header__item"><a id="draws" class="filter__link filter__link--number" href="#">Attack</a></div>
                                <div class="header__item"><a id="losses" class="filter__link filter__link--number" href="#">tags</a></div>
                                <div class="header__item"><a id="total" class="filter__link filter__link--number" href="#">Hp</a></div>
                                <div class="header__item"><a id="total" class="filter__link filter__link--number" href="#">Movement</a></div>
                            </div>
                            <div class="table-content">
                                {this.get_table("adc")}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div class="text-center">
                    <button class="rainbow rainbow-1" onClick={
                        this.set_top
                    }>Top</button>
                    <button class="rainbow rainbow-1" onClick={
                        this.set_mid
                    }>Mid</button>
                    <button class="rainbow rainbow-1" onClick={
                        this.set_jug
                    }>Jug</button>
                    <button class="rainbow rainbow-1" onClick={
                        this.set_adc
                    }>Bot</button>
                    <button class="rainbow rainbow-1" onClick={
                        this.set_sup
                    }>Sup</button>
                    <button class='rainbow rainbow-1' onClick={this.clean}>Clear</button>
                </div>
                <div>
                    {this.lists()}
                </div>
            </div>
        )
    }
}
export default champion
