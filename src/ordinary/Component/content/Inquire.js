import { Input, Button, Form, notification, Table } from 'antd';
import React from 'react'
import './css/inquire.css'
import service from '../../http';

class Inquire extends React.Component {

    state = {
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
                dataIndex: 'operate'
            }
        ],
        data: [
            {
                newsId: '',
                title: '',
                author: '',
                date: '',
                operate: <div>
                    <Button type="primary" htmlType="submit">
                        修改
                    </Button>
                    <Button type="primary" htmlType="submit">
                        删除
                    </Button>
                    <Button type="primary" htmlType="submit">
                        查看
                    </Button>
                </div>,
            },
        ]
    }
    render() {
        const openNotificationWithIcon = type => {
            notification[type]({
                message: '查询成功',
                description:
                    'This is the content of the notification.',
            });
        };
        const openNotification = type => {
            notification[type]({
                message: '查询失败',
                description:
                    'This is the content of the notification.',
            });
        };
        const onFinish = (values) => {
            // console.log(values);
            service.get(`/news/query?newsId=${values.serial}&title=${values.title}`).then((re) => {
                // console.log(re.data);
                if (re.data.code === 2) {
                    openNotificationWithIcon('success')
                    // console.log(re.data.data.list);
                    let List = re.data.data.list
                    // console.log(List);
                    this.setState(
                        this.state.data = List
                    )
                }
                if (re.data.code === 3) {
                    openNotification('success')
                }
            })
        };
        return (
            <div>
                <div className="roun">


                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        {/* 输入框 */}
                        <h2>添加栏目</h2>
                        <div className="lanm-left">

                            <div>
                                <Form.Item name="serial">
                                    <Input placeholder="编号" />
                                </Form.Item>
                            </div>

                            <div>
                                <Form.Item name="title">
                                    <Input placeholder="标题" />
                                </Form.Item>

                            </div>

                            {/* <div>
                                <Form.Item name="date">
                                    <Input placeholder="日期" />
                                </Form.Item>
                            </div> */}
                        </div>

                        <div>
                            <Form.Item
                                wrapperCol={{
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    查询
                                </Button>
                            </Form.Item>
                        </div>

                    </Form>
                </div>
                <div>
                    <h4>Middle size table</h4>
                    <Table columns={this.state.columns} dataSource={this.state.data} size="middle" />
                </div>
            </div>
        )
    }
}

export default Inquire