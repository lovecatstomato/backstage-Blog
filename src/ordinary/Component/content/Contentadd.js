import React, { useState, useEffect } from 'react';
// import E from 'wangeditor'
import ReactWEditor from 'wangeditor-for-react';
import {
    Form,
    Input,
    Button,
    Select,
    Upload,
    message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Option } = Select;

const FormSizeDemo = () => {
    const [list, setList] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        axios.get('http://127.0.0.1:8086/news/column/all', {
            headers: {
                'X-Token': localStorage.getItem('token')
            }
        }).then(resp => {
            setList(resp.data.data);
        });
    }, []);


    const onFinish = (values) => {
        console.log(values);
        const fd = new FormData();
        fd.append('title', values.title);
        fd.append('content', values.content);
        fd.append('columnId', values.columnId);
        if (values.upload.fileList.length) {
            fd.append('file', values.upload.file);
        }
        if (values.remark) {
            fd.append('remark', values.remark);
        }
        console.log(fd);

        axios.post('http://127.0.0.1:8086/news/add', fd, {
            headers: {
                'X-Token': localStorage.getItem('token')
            }
        }).then(resp => {
            console.log(resp.data);
            if (resp.data.code === 2) {
                message.success('添加成功');
                form.resetFields(); // 重置表单
            }
        })
    };

    const onBeforeUpload = (file) => {
        return false;
    };



    return (

        <Form
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 14, }}
            layout="horizontal"
            form={form}
            onFinish={onFinish}
        >
            <Form.Item label="新闻标题" name="title"
                rules={[{ required: true, message: '新闻标题不能为空' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="描述" name="remark">
                <Input />
            </Form.Item>
            <Form.Item label="栏目编号" name="columnId"
                rules={[{ required: true, message: '请选择新闻栏目' }]}
            >
                <Select>
                    {
                        list.map(item => <Option key={item.columnId} value={item.columnId}>{item.columnName}</Option>)
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name="upload"
                label="图片上传"
            >
                <Upload name="logo" listType="picture"
                maxCount={1}
                 beforeUpload={onBeforeUpload} >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item name="content" label="新闻内容"
                rules={[{ required: true, message: '请输入新闻内容', trigger: 'blur' }]}
            >
                <ReactWEditor
                    config={{
                        uploadImgServer: 'http://127.0.0.1:8086/news/upload',
                        uploadFileName: 'file',
                        uploadImgHeaders: {
                            'X-Token': localStorage.getItem('token')
                        }
                    }}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">添加</Button>
            </Form.Item>
        </Form>

    );
};

export default FormSizeDemo