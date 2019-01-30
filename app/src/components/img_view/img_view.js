import React, { Component } from 'react';
import { connect } from 'dva'
import styles from './img_view.css'

class ImgView extends Component {
    render() {
        let { data, dispatch } = this.props
        return (
            data.isShow ?
                <div className={styles.img_view} onClick={() => {
                    dispatch({ type: 'imgView/hideImgView' })
                }}>
                    <img src={data.imgUrl} alt="" className={styles.img} />
                </div> : null
        )
    }
}

let mapStateToProps = (state) => {
    return {
        data: state.imgView
    }
}
export default connect(mapStateToProps)(ImgView)