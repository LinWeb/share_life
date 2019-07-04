import React, { Component } from 'react';
import API from '../../services/index'
import { connect } from 'dva'
import { List, WhiteSpace, DatePicker, InputItem, Picker, Tag, TextareaItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import AreaData from '../../lib/area'

const Item = List.Item;

class MyProfile extends Component {
    state = {
        newUserInfo: {},
        sexData: [{
            value: 0,
            label: '女'
        }, {
            value: 1,
            label: '男'
        }],
    }
    async replaceHeadImg(event) {
        let file = event.target.files[0]
        let res = await API.UPLOAD_HEAD({ file })
        let head_img_url = res.data.url
        this.updateNewUserInfo({ head_img_url })
    }
    updateNewUserInfo(data) {
        this.setState(() => ({
            newUserInfo: { ...this.state.newUserInfo, ...data }
        }));
    }
    saveNewUserInfo() {
        this.props.dispatch({
            type: 'user/updateUserInfoAction', data: this.state.newUserInfo
        })
    }
    selectHobbies(value, isSelected) {
        let { hobbies } = this.state.newUserInfo
        if (isSelected) {
            let h = hobbies.filter(val => val !== value)
            this.updateNewUserInfo({ hobbies: h })
        } else {
            this.updateNewUserInfo({ hobbies: [...hobbies, value] })
        }
    }
    UNSAFE_componentWillMount() {
        this.setState(() => ({
            newUserInfo: { ...this.props.userInfo }
        }));
    }
    render() {
        let { sexData, newUserInfo } = this.state
        let { hobbiesData, } = this.props
        let { nickname, head_img_url, sign, hobbies,
            birthday, address, sex } = newUserInfo
        let { getFieldProps } = this.props.form
        return (
            <div>
                <List>
                    <Item
                        arrow="horizontal"
                        extra={<img src={head_img_url} alt='' />}
                    >
                        <label htmlFor='file' style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}></label>
                        <input type='file' accept="image/*" id="file" style={{ display: 'none' }} onChange={(e) => { this.replaceHeadImg(e) }} />
                        更换头像
                    </Item>
                    <InputItem
                        clear
                        value={nickname}
                        placeholder="请填写您的昵称"
                        onBlur={val => { this.updateNewUserInfo({ nickname: val }) }}
                    >昵称</InputItem>
                    <TextareaItem
                        value={sign}
                        title="个人签名"
                        placeholder="请填写属于您自己的个人签名..."
                        autoHeight
                        rows={3}
                        style={{ color: '#888' }}
                        onChange={val => this.updateNewUserInfo({ sign: val })}
                    />
                </List>
                <WhiteSpace />
                <List>
                    <Picker extra="请选择"
                        data={sexData}
                        cols={1}
                        {...getFieldProps('sexData', {
                            initialValue: [sex],
                        })}
                        onOk={([val]) => this.updateNewUserInfo({ sex: val })}
                    >
                        <List.Item arrow="horizontal">性别</List.Item>
                    </Picker>
                    <DatePicker
                        mode="date"
                        value={birthday ? new Date(birthday) : new Date()}
                        minDate={new Date(1900, 1, 1)}
                        maxDate={new Date()}
                        onChange={val => this.updateNewUserInfo({ birthday: val })}
                    >
                        <List.Item arrow="horizontal">出生日期</List.Item>
                    </DatePicker>
                    <Picker extra="请选择"
                        data={AreaData}
                        {...getFieldProps('district', {
                            initialValue: address,
                        })}
                        onOk={val => this.updateNewUserInfo({ address: val })}
                    >
                        <List.Item arrow="horizontal">所在家乡</List.Item>
                    </Picker>
                </List>
                <WhiteSpace />
                <List>
                    <Item arrow="empty">
                        兴趣爱好
                       <div style={{ marginTop: '4px', marginBottom: '23px' }}>
                            {hobbiesData.map(({ value, label, isSelected }) => (
                                <Tag selected={hobbies ? hobbies.includes(value) : false} key={value}
                                    onChange={() => this.selectHobbies(value, isSelected)}
                                    style={{ marginRight: '12px', marginTop: '12px', float: "left" }}
                                >{label}</Tag>
                            ))}
                        </div>
                    </Item>
                </List>
                <WhiteSpace />
                <WhiteSpace />
                <div style={{ padding: '0 12px' }}>
                    <Button type="primary" onClick={() => { this.saveNewUserInfo() }}>保存</Button>
                </div>
            </div >
        )
    }
}

export default connect((state) => {
    return {
        _author: state.user.userId,
        userInfo: state.user.userInfo,
        hobbiesData: state.user.hobbiesData,
    }
})(createForm()(MyProfile)) 