import React from 'react'
import { Table, Button} from 'antd';
import service from '../../http';
import '../Column/css/Manage.css'
import { newsDeleteApi } from '../../../api';
import {Link} from 'react-router-dom';


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

                        <Link to={`/about/newsmana/update/${record.newsId}`}>修改</Link>

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
                // console.log(re.data.data);
                let List = re.data.data.list
                // console.log(List);
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