import React, { Component } from 'react'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/';


class Test extends Component {
    constructor() {
        super()
        this.state = {
            categoryVal: ''
        }
    }
    componentDidMount() {
        axios.get('/category/id', { id: '' }).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
    }
    addCategory = () => {
        axios.post('/category/add', { name: this.state.categoryVal }).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
    }
    onChange = (event) => {
        let val = event.target.value
        this.setState(() => ({
            categoryVal: val
        }))
    }
    render() {
        return <div><input type='text' value={this.state.categoryVal} onChange={this.onChange} /><button onClick={this.addCategory}>增加分类</button></div>
    }
}

export default Test