import { Form, Input, Button, notification } from 'antd';
// import axios from 'axios';
import service from '../../http';

const Home = () => {
    const openNotificationWithIcon = type => {
        notification[type]({
            message: '添加成功',
            description:
                'This is the content of the notification',
        });
    };
    const openNotification = type => {
        notification[type]({
            message: '添加失败',
            description:
                'This is the content of the notification',
        });
    };

    const onFinish = (values) => {
        console.log(values.username);
        service.post(`/news/column/add?columnName=${values.username}`).then((re) => {
            console.log(re.data);
            if (re.data.code === 2) {
                console.log(re);
                openNotificationWithIcon('success')
            }
            if (re.data.code === 3) {
                openNotification('success')
            }
        })
    };
    return (
        <div>
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
                <h2>添加栏目</h2>
                <div className="lanm-left">
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input placeholder="栏目名称" />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        wrapperCol={{
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            添加
                        </Button>
                    </Form.Item>
                </div>

            </Form>
        </div>
    );
};

export default Home