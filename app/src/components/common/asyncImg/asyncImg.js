import React, { Component, } from 'react';

class AsyncImg extends Component {
    constructor(props) {
        super(props)
        this.state = {
            url: ''
        }
    }
    UNSAFE_componentWillMount() {
        let img = new Image();
        img.src = this.props.origin;
        img.onload = () => {
            this.setState(() => ({
                url: img.src
            }))
        }
    }
    render() {
        let { url } = this.state
        let { origin, ...rest } = this.props
        return (
            <img src={url || 'http://iph.href.lu/123x123?text=loading...'} {...rest} />
        )
    }
}

export default AsyncImg

