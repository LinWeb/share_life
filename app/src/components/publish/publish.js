import React, { Component } from 'react';
import {
    List, Button, TextareaItem,
    ImagePicker, WingBlank, Picker
} from 'antd-mobile';
import { createForm } from 'rc-form';
import API from '../../services/index'
import { connect } from 'dva';
class Publish extends Component {
    state = {
        files: [],
        categoryData: [],
        categoryId: '',
        images: []
    }
    async getCategory() {
        let res = await API.CATEGORY()
        if (res) {
            let data = res.data.map(({ name, _id }) => {
                return { label: name, value: _id }
            });
            data.forEach(({ value }, index) => {
                if (index === 0) {
                    this.selectCategory(value)
                }
            });
            this.setState(() => ({ categoryData: data }))
        }
    }
    UNSAFE_componentWillMount() {
        this.getCategory()
    }
    selectCategory(id) {
        if (id) {
            this.setState(() => ({
                categoryId: id,
            }))
        }
    }
    selectImgs = async (files, type, index) => {
        let newFile = files[files.length - 1].file
        // console.log(files, type, index);
        // console.log(this.state.files)
        // console.log(newFile)
        let res = await API.UPLOAD({ file: newFile, type: 2 })
        let imgUrl = res.data.url
        this.setState((preState) => {
            let images = [...preState.images, imgUrl]
            return {
                files,
                images,
            }
        });
    }
    submit = async () => {

        let { form, history, _author } = this.props,
            { getFieldValue } = form,
            content = getFieldValue('content'),
            { categoryId, images } = this.state;

        let res = await API.PUBLISH({ content, _category: categoryId, _author, images })
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
                    onChange={([id]) => { this.selectCategory(id) }}
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
                        onChange={this.selectImgs}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        selectable={files.length < 9}
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