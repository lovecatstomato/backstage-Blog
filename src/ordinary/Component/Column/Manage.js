import React, { useState } from 'react'
// antd需要标签引入
import { Form, Input, Table, Button, Modal } from 'antd';
// 拦截器
import service from '../../http';
// 样式
import './css/Manage.css'
// api引入
import { newsColumnUpdateApi, newsColumnDeleteApi } from '../../../api'


// 修改组件
const Add = (record) => {
    // console.log(record.record);
    // 修改请求
    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(values.columnId);
        setIsModalVisible(false);
        newsColumnUpdateApi({ columnName: values.columnName, columnId: values.columnId }).then(red => {
            if (red.code === 2) {
                // record
                // console.log(record);

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
                        span: 8,
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
                        name="columnId"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="columnName"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
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


class Manage extends React.Component {
    // 删除按钮数据
    del = (valu) => {
        // newsColumnDeleteApi()
        console.log(valu);
        newsColumnDeleteApi({ columnId: valu.columnId }).then(ret => {
            console.log(ret);
        })
    }
    // 数组
    state = {
        page: 1,
        // 列表标题
        columns: [
            {
                title: '栏目编号',
                dataIndex: 'columnId',
            },
            {
                title: '名称',
                dataIndex: 'columnName',
            },
            {
                title: '操作',
                dataIndex: 'operate',
                render: (text, record, index) =>
                    <div className="but">
                        <Add record={record} />
                        {/* <Button type="primary" htmlType="submit" onClick={() => this.showCurRowMessage(record)}>
                            修改
                        </Button> */}
                        <Button type="primary" htmlType="submit" onClick={() => this.del(record)}>
                            删除
                        </Button>
                    </div>
            },
        ],
        // 列表内容
        data: [
            {
                columnId: '',
                columnName: '',
                operate: '',
            },
        ]
    }
    // 列表内容请求
    sf = () => {
        service.get("/news/column/all").then((re) => {
            // console.log(re.data);
            if (re.data.code === 2) {
                // console.log(re.data.data);
                let List = re.data.data
                console.log(List);
                this.setState(
                    this.state.data = List
                )
            }
        })
    }
    // 生命周期
    componentDidMount() {
        // 列表渲染
        this.sf()
    }

    render() {

        // 页面内容
        return (
            <div>
                <h4>新闻栏目管理</h4>
                <Table columns={this.state.columns} dataSource={this.state.data} size="middle" />
            </div>
        )
    }

}


export default Manage