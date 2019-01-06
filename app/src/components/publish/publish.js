import React, { Component } from 'react';
import {
    List, WhiteSpace, Button, TextareaItem,
    ImagePicker, WingBlank, SegmentedControl, Picker
} from 'antd-mobile';
import { createForm } from 'rc-form';
import API from '../../services/index'
import { connect } from 'dva';
class Publish extends Component {
    state = {
        files: [],
        categoryData: [],
        categoryId: '',
    }
    async getCategory() {
        let res = await API.CATEGORY()
        if (res) {
            let data = res.data.map(({ name, _id }) => {
                return { label: name, value: _id }
            });
            this.setState(() => ({ categoryData: data }))
        }
    }
    componentWillMount() {
        this.getCategory()
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
    selectCategory = ([id]) => {
        if (id) {
            this.setState(() => ({
                categoryId: id,
            }))
        }
    }
    submit = async () => {
        let { form, history, _author } = this.props,
            { getFieldValue, validateFields } = form,
            content = getFieldValue('content'),
            _category = this.state.categoryId;
        let res = await API.PUBLISH({ content, _category, _author })
        if (res) {
            history.replace('/')
        }
    }
    render() {
        let { files, categoryData, categoryId } = this.state;
        let { form } = this.props,
            { getFieldProps } = form;

        return (
            <div>
                <Picker
                    data={categoryData}
                    cols={1}
                    value={[categoryId]}
                    onChange={this.selectCategory}
                >
                    <List.Item arrow="horizontal">#话题#</List.Item>
                </Picker>
                <List>
                    <TextareaItem
                        {...getFieldProps('content', {
                        })}
                        placeholder={'晒晒我的生活...'}
                        rows={5}
                        count={100}
                    />
                </List>
                <WingBlank>
                    <ImagePicker
                        files={files}
                        onChange={this.onChange}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 10}
                        multiple={true}
                    />
                </WingBlank>
                <Button type="primary" style={{ position: "absolute", bottom: 0, width: '100%', borderRadius: 0 }} onClick={this.submit}>发表</Button>
            </div>
        )
    }
}


export default connect((state) => {
    return {
        _author: state.user.userId
    }
})(createForm()(Publish))