import React, { useState } from 'react';
// import E from 'wangeditor'
import ReactWEditor from 'wangeditor-for-react';
import {
    Form,
    Input,
    Button,
    Select,
    Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';


const FormSizeDemo = () => {
    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }

        return e && e.fileList;
    };
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        let fd = new FormData();
        fd.set('title', values.title);
        fd.set('content', values.content);
        fd.set('columnId', values.columnId);
        // for(let item of fd){
        //     console.log(item, 22);
        // }
        fd.set('file', values.upload[0]);
        fd.set('remark', values.remark);
        axios.post('http://localhost:8086/news/add',fd,{
            headers: {'X-Token': localStorage.getItem('token')}
        }).then(resp => {
            console.log(1);
            // console.log(localStorage.getItem('token'));
            console.log(resp,333);
        });
    };

    const onBeforeUpload = (file)=>{
        console.log(file, 111);
        return false;
    };


    return (

        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
            initialValues={{
                size: componentSize,
            }}
            onFinish={onFinish}

            onValuesChange={onFormLayoutChange}
            size={componentSize}
        >
            <Form.Item label="新闻标题" name="title">
                <Input />
            </Form.Item>
            <Form.Item label="新闻作者" name="user">
                <Input />
            </Form.Item>
            <Form.Item label="新闻分类" name="columnId">
                <Select>
                    <Select.Option value="1">Demo</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="upload"
                label="图片上传"
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload name="logo" listType="picture" beforeUpload={onBeforeUpload}>
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item label=" " name="remark">
                <ReactWEditor
                    defaultValue={'<h1>标题</h1>'}
                    linkImgCallback={(src, alt, href) => {
                        // 插入网络图片的回调事件
                        console.log('图片 src ', src)
                        console.log('图片文字说明', alt)
                        console.log('跳转链接', href)
                    }}
                    onlineVideoCallback={(video) => {
                        // 插入网络视频的回调事件
                        console.log('插入视频内容', video)
                    }}
                    onChange={(html) => {
                        console.log('onChange html:', html)
                    }}
                    onBlur={(html) => {
                        console.log('onBlur html:', html)
                    }}
                    onFocus={(html) => {
                        console.log('onFocus html:', html)
                    }}
                />
            </Form.Item>
            <Form.Item label=" " >
                <Button type="primary" htmlType="submit">添加</Button>
            </Form.Item>
        </Form>

    );
};

export default FormSizeDemo