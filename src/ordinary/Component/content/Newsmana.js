import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import service from '../../http';
import '../Column/css/Manage.css'
import { newsUpdateApi, newsDeleteApi } from '../../../api'
import ReactWEditor from 'wangeditor-for-react/lib/core';
import axios from 'axios';
const { Option } = Select;

// 修改组件
const Add = (record) => {
    const [list, setList] = useState([]);
    // const [form] = Form.useForm();
    // console.log(record.record);
    useEffect(() => {
        axios.get('http://127.0.0.1:8086/news/column/all', {
            headers: {
                'X-Token': localStorage.getItem('token')
            }
        }).then(resp => {
            setList(resp.data.data);
        });
    }, []);
    // 修改请求
    const onFinish = (values) => {
        console.log('Success:', values);
        const fd = new FormData()
        fd.set('newsId', values.newsId)
        fd.set('title', values.title)
        fd.set('content', values.content)
        fd.set('columnId', values.columnId)
        fd.set('remark', values.remark)
        axios.post('http://127.0.0.1:8086/news/update', fd, {
            headers: {
                'X-Token': localStorage.getItem('token')
            }
        }).then(resp => {
            console.log(resp.data);
            if (resp.data.code === 2) {
                message.success('修改成功');
                setIsModalVisible(false);
                // form.resetFields(); // 重置表单
            }
        })
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    // 修改弹窗
    const showModal = () => {
        setIsModalVisible(true);
    };
    // 退出窗口
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            {/* 页面内容 */}
            <Button type="primary" onClick={showModal}>
                修改
            </Button>
            <Modal visible={isModalVisible} onCancel={handleCancel} footer={[]}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    // 获取列表行内数据
                    initialValues={
                        record.record
                    }
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="newsId"
                        label="新闻id"
                    >
                        <Input disabled />
                    </Form.Item>

                    <Form.Item
                        name="title"
                        label="标题"
                    >
                        <Input />
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
                        name="remark"
                        label="描述"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            修改
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

// 列表组件
class Newsmana extends React.Component {
    // 删除事件
    del = (reco) => {
        console.log(1);
        console.log(reco);
        newsDeleteApi({ newsId: reco.newsId }).then(reds => {
            console.log(reds);
        })
    }
    // 查看事件
    check = () => {
        console.log(2);
    }
    // 列表数组
    state = {
        // 列表头数组
        columns: [
            {
                title: '新闻编号',
                dataIndex: 'newsId',
            },
            {
                title: '新闻标题',
                dataIndex: 'title',
            },
            {
                title: '作者',
                dataIndex: 'author',
            },
            {
                title: '创建时间',
                dataIndex: 'date',
            },
            {
                title: '操作',
                dataIndex: '',
                render: (text, record, index) =>
                    <div className="but">

                        <Add record={record} />

                        <Button type="primary" htmlType="submit" onClick={() => this.del(record)} >
                            删除
                        </Button>

                        <Button type="primary" htmlType="submit" onClick={this.check} >
                            查看
                        </Button>

                    </div>
            }
        ],
        data: [
            {
                newsId: '',
                title: '',
                author: '',
                date: '',
                operate: '',
            },
        ]
    }
    // 生命周期
    componentDidMount() {
        service.get("/news/list").then((re) => {

            // console.log(re.data);
            if (re.data.code === 2) {
                console.log(re.data.data);
                let List = re.data.data.list
                console.log(List);
                this.setState(
                    this.state.data = List
                )
            }
        })
    }
    render() {
        return (
            <div>
                <h4>Middle size table</h4>
                <Table columns={this.state.columns} dataSource={this.state.data} size="middle" />
            </div>
        )
    }

}


export default Newsmana