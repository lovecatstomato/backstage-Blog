import React, { useState } from 'react'
import { Table, Button, Modal, Form, Input, Radio } from 'antd';
import service from '../../http';
import '../Column/css/Manage.css'

// 修改组件
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    // console.log(record);
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Create a new collection"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const CollectionsPage = (record) => {
    const [visible, setVisible] = useState(false);
    // 修改按钮事件
    const onCreate = (values) => {
        console.log(record,333);
        console.log('Received values of form: ', values);
        setVisible(false);
    };

    return (
        // 返回页面内容
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                修改
            </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

// 列表组件
class Newsmana extends React.Component {
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

                        <div>
                            <CollectionsPage record={record}/>
                        </div>
                        <div>
                            <Button type="primary" htmlType="submit">
                                删除
                            </Button>
                        </div>
                        <div>
                            <Button type="primary" htmlType="submit">
                                查看
                            </Button>
                        </div>

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

            console.log(re.data);
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