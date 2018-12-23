import React, { Component } from 'react'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/';


class Test extends Component {
    componentDidMount() {
        axios.get('/category/id', { id: '' }).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
    }
    addCategory = () => {
        axios.post('/category/add', { name: 'test' }).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
    }
    render() {
        return <div><input type='text' /><button onClick={this.addCategory}>增加分类</button></div>
    }
}

export default Test