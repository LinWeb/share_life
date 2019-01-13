import React, { Component } from 'react';
import API from '../../services/index'
import { connect } from 'dva'
import { List, WhiteSpace, DatePicker, Picker, Tag } from 'antd-mobile';
import { createForm } from 'rc-form';
import { district } from 'antd-mobile-demo-data'

const Item = List.Item;

class MyProfile extends Component {
    state = {
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
    async replaceHeadImg(event) {
        let file = event.target.files[0]
        let res = await API.UPLOAD({ file, type: 1 })
        let head_img_url = res.data.url
        this.setState(() => ({
            head_img_url
        }));
    }
    updateUserInfo(data) {
        this.props.dispatch({
            type: 'user/updateUserInfoAction', data
        })
    }

    selectHobbies(value, isSelected) {
        let hobbies = this.props.userInfo.hobbies
        if (isSelected) {
            let h = hobbies.filter(val => val !== value)
            this.updateUserInfo({ hobbies: h })
        } else {
            this.updateUserInfo({ hobbies: [...hobbies, value] })
        }
    }

    async getUserInfo() {
        // // 测试接口
        // let id = this.props.userId
        // let res = await API.USER_INFO({ id })
        // if (res) {
        //     let hobbies = res.data.hobbies
        //     let { hobbiesData } = this.state;
        //     let data = hobbiesData.map(item => {
        //         let isSelected = hobbies.includes(item.value)

        //         return { ...item, isSelected }
        //     })
        //     this.setState(() => ({
        //         userInfo: res.data,
        //         hobbiesData: data
        //     }))
        // }
    }
    render() {
        let { head_img_url, sign,
            birthday, address, sex } = this.props.userInfo
        let { sexData, hobbiesData, } = this.state
        let { getFieldProps } = this.props.form
        return (
            <div>
                <List>
                    <label htmlFor='file'>
                        <input type='file' accept="image/*" id="file" style={{ display: 'none' }} onChange={(e) => { this.replaceHeadImg(e) }} />
                        <Item
                            arrow="horizontal"
                            extra={<img src={head_img_url} />}
                        >
                            更换头像
                        </Item>
                    </label>
                    <WhiteSpace />
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
            </div>
        )
    }
}

export default connect((state) => {
    return {
        _author: state.user.userId,
        userInfo: state.user.userInfo,
    }
})(createForm()(MyProfile)) 