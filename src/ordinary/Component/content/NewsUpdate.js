import React, {useState, useEffect} from 'react';
import {Form,Input,Select,Upload,Button,message} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactWEditor from 'wangeditor-for-react';
import axios from 'axios';
import qs from 'query-string';

const { Option } = Select;

function NewsUpdate(props){

    const [form] = Form.useForm();
    const [list, setList] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [pic, setPic] = useState('');
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        // 栏目列表
        axios.get('http://127.0.0.1:8086/news/column/all', {
            headers: {
                'X-Token': localStorage.getItem('token')
            }
        }).then(resp => {
            setList(resp.data.data);
        });

        // 新闻详情
        axios.get('http://127.0.0.1:8086/news/detail?newsId='+props.match.params.id,{
            headers: {
                'X-Token': localStorage.getItem('token')
            }
        }).then(
            resp => {
                const {title,remark,columnId,pic,content} = resp.data.data;
                if(pic){
                    setPic(pic);
                    setFileList([
                        {uid: '-1',name: pic.substring(pic.lastIndexOf('/')+1), status: 'done', url: 'http://127.0.0.1:8086/'+pic}
                    ]);
                }
                form.setFieldsValue({title, remark,columnId,content});
            }
        );

    }, []);

    const onFinish = (values) => {
        values.pic = pic;
        values.newsId = props.match.params.id;
        console.log(qs.stringify(values));
        axios.post('http://127.0.0.1:8086/news/update', qs.stringify(values), {
            'Content-Type': 'application/www-url-formencoded',
            'X-Token': localStorage.getItem('token')
        }).then(resp => {
            const {code,message:msg} = resp.data;
            if(code === 2){
                message.success('修改成功');
                props.history.push('/about/newsmana/all');
            }else{
                message.error(msg);
            }
        })
    };

    const onBeforeUpload = (file) => {
        setFileList([file]);
        return false;
    };

    const onFileChange = ({fileList})=>{
        setFileList(fileList);
        setDisabled(false);
    };

    const onHandleUpload = () => {
        setUploading(true);
        const fd =new FormData();
        fd.append('file', fileList[0].originFileObj);
        axios.post('http://127.0.0.1:8086/news/upload', fd, {
            headers: {
                'X-Token': localStorage.getItem('token')
            }
        }).then(resp => {
            const {errno, data:[{url}]} = resp.data;
            setUploading(false);
            if(errno === 0){
                let pic = url.replace('//127.0.0.1:8086/', '');
                setPic(pic);

                setFileList([
                    {uid: '-1',name: pic.substring(pic.lastIndexOf('/')+1), status: 'done', url}
                ]);

                setDisabled(true); // 禁用上传按钮
                message.success('文件上传成功');
            }else{
                message.error('文件上传失败');
                setDisabled(false);
            }
        }).catch(err => {
            setUploading(false);
            setDisabled(false);
            message.error('文件上传失败');
        })
    };
    
    return (<Form
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
            // name="upload"
            label="图片上传"
        >
            <Upload name="logo" listType="picture"
            maxCount={1}
             beforeUpload={onBeforeUpload} onChange={onFileChange}
            fileList={fileList}>
                <Button icon={<UploadOutlined />}>请选择图片</Button>
            </Upload>
            <Button 
                onClick={onHandleUpload} 
                disabled={fileList.length === 0 || disabled}
                loading={uploading}
            >{uploading?'上传中':'上传'}</Button>
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
            <Button type="primary" htmlType="submit">修改</Button>
        </Form.Item>
    </Form>);
}

export default NewsUpdate;