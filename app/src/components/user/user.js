import React, { Component } from 'react';
import styles from './user.css'
import { List, WhiteSpace, Button, DatePicker, Picker, Tag } from 'antd-mobile';
import { district } from 'antd-mobile-demo-data'
import { createForm } from 'rc-form';
import { connect } from 'dva'
import API from '../../services/index'
const Item = List.Item;
const Brief = Item.Brief;


class User extends Component {
    state = {
        userInfo: {},
        sexData: [{
            value: 0,
            label: '女'
        }, {
            value: 1,
            label: '男'
        }],
        hobbiesData: [
            {
                value: '1',
                label: '游泳',
                isSelected: false
            },
            {
                value: '2',
                label: '篮球',
                isSelected: false
            },
            {
                value: '3',
                label: '羽毛球',
                isSelected: false
            },
            {
                value: '4',
                label: '摄影',
                isSelected: false
            },
            {
                value: '5',
                label: '旅游',
                isSelected: false
            }
        ]
    }
    logout = async () => {
        let { dispatch } = this.props
        dispatch({ type: 'user/logout' })
    }
    async getUserInfo() {
        // 测试接口
        let id = this.props.userId
        let res = await API.USER_INFO({ id })
        if (res) {
            let hobbies = res.data.hobbies
            let { hobbiesData } = this.state;
            let data = hobbiesData.map(item => {
                let isSelected = hobbies.includes(item.value)

                return { ...item, isSelected }
            })
            this.setState(() => ({
                userInfo: res.data,
                hobbiesData: data
            }))
        }
    }
    async updateUserInfo(data) {
        // 测试接口
        let res = await API.UPDATE_USER_INFO(data)
        if (res) {
            this.setState((prevState) => ({
                userInfo: { ...prevState.userInfo, ...data }
            }))
        }
    }
    selectHobbies(value, isSelected) {
        let hobbies = this.state.userInfo.hobbies
        if (isSelected) {
            let h = hobbies.filter(val => val !== value)
            this.updateUserInfo({ hobbies: h })
        } else {
            this.updateUserInfo({ hobbies: [...hobbies, value] })
        }
    }
    componentWillMount() {
        this.getUserInfo()
    }
    render() {
        let { username, head_img_url, sign,
            dynamic_count, follows_count,
            fans_count, birthday, address, sex } = this.state.userInfo
        let { sexData, hobbiesData } = this.state
        let { getFieldProps } = this.props.form

        return (
            <div className={styles.user_container}>
                <List>
                    <Item
                        arrow="horizontal"
                        thumb={head_img_url}
                        multipleLine
                        onClick={() => { }}
                        className={styles.head_img}
                    >
                        {username}
                        &nbsp;
                        {sex ?
                            <span className="iconfont icon-nan" style={{ color: 'rgb(51, 163, 244)' }} />
                            :
                            <span className="iconfont icon-nv" style={{ color: 'rgb(255, 77, 148)' }} />
                        }
                        <Brief>{sign}</Brief>
                    </Item>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <List>
                    <Item extra={dynamic_count} arrow="horizontal" onClick={() => { }}>我的动态</Item>
                    <Item extra={follows_count} arrow="horizontal" onClick={() => { }}>我的关注</Item>
                    <Item extra={fans_count} arrow="horizontal" onClick={() => { }}>我的粉丝</Item>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <List>
                    <Picker extra="请选择"
                        data={sexData}
                        cols={1}
                        {...getFieldProps('sexData', {
                            initialValue: [sex],
                        })}
                        onOk={([val]) => this.updateUserInfo({ sex: val })}
                    >
                        <List.Item arrow="horizontal">性别</List.Item>
                    </Picker>
                    <DatePicker
                        mode="date"
                        value={birthday ? new Date(birthday) : new Date()}
                        minDate={new Date(1900, 1, 1)}
                        maxDate={new Date()}
                        onChange={val => this.updateUserInfo({ birthday: val })}
                    >
                        <List.Item arrow="horizontal">出生日期</List.Item>
                    </DatePicker>
                    <Picker extra="请选择"
                        data={district}
                        {...getFieldProps('district', {
                            initialValue: address,
                        })}
                        onOk={val => this.updateUserInfo({ address: val })}
                    >
                        <List.Item arrow="horizontal">所在家乡</List.Item>
                    </Picker>
                    <Item arrow="empty">
                        兴趣爱好
                       <div style={{ marginTop: '4px', marginBottom: '23px' }}>
                            {hobbiesData.map(({ value, label, isSelected }) => (
                                <Tag selected={isSelected} key={value}
                                    onChange={() => this.selectHobbies(value, isSelected)}
                                    style={{ marginRight: '12px', marginTop: '12px', float: "left" }}
                                >{label}</Tag>
                            ))}
                        </div>
                    </Item>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <WhiteSpace />
                <div style={{ padding: '0 12px' }}>
                    <Button type="warning" onClick={this.logout}>退出</Button>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return {
        userId: state.user.userId
    }
})(createForm()(User))