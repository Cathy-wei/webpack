import React, { useState, useEffect } from 'react';
import { Layout, Card, Col, Row, Button, Divider, Input, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { query as queryCategories } from '@/services/categories';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useIntl, FormattedMessage } from 'umi';
import { queryID } from '@/services/categories';
import { Table, Tag, Space } from 'antd';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
  

export default () => {
  const [value, setValue] = useState('商品分类描述')
  const [ID, setID] = useState(window.location.href?.substring(window.location.href?.lastIndexOf("/") + 1));
  const [res, setRes] = useState({});
  let [loadings, setLoading] = useState(false);
  let [imageUrl, setImg] = useState();
  let [headers, setHeaders] = useState({ Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYjY2MTEwZmZjYTY2NWY2MTgwOGZjMjA4ZjAwZWQxOGU0ZmU0ZTMzNTFlOGNkMjMxYWE5NWJlYWU3MDcwYjJkODg5NTQ0ZGY5YmVlZTlkZTEiLCJpYXQiOjE2MDg3ODEyMDksIm5iZiI6MTYwODc4MTIwOSwiZXhwIjoxNjQwMzE3MjA5LCJzdWIiOiIzIiwic2NvcGVzIjpbIioiXX0.Ml9XaYvW4ebNLlMk9yJr9EEow3kwvylGzV3L0IhRJC5CkZiY27SXmcFkzGsKCc6xkL1xs7s9hD3HlZSn6dMJ2UPidzyJHI0OAXNgQm8n4IkjmXAfdKFN0iJlVR4ZP-Mp8RtbK217NgDgo77FY4LOkHgrQx3MvifGseJQQYp21ZCKsTHaFSzByXkhaszF4yvwjgsWyt4tO7d_gbFwXiqfNZsBgTNyZk9BkjpwJX8KJn9T6I2dRNYecgC9PyAoKH6ZhOgqCpGAdPPemOo86YmFcjf34Rby6YUvy6ajjtHQNlhvBGKAz9f9YKbh2sqI-y_b4qBke227-tF86k50xO5PT_htGBy62WkKw1-LLCgAUqp-UzdHiNVMOZi-vprrf2NxIhzaX3zD0FMn6oU7pZDpeUGd5Nygt3Tdx1z_2yo5rpFBi6QwDaFtyiCD_ebq3v3lha4Z9YF411npUIwNQjXNmfalpKZjGxTRQmB5u75BGoNTe0Sp9XfZ0A6IX63XatuXeCMDR6A_9U_dN8IRteZmPpdbnoCLGfBrbfyx7VGK9s8aUy0jQuIw81ACtEUXPJkz_yM2WWcVmwBDumIXjZKGXoOcmcl80SYFBkXmlE7tOt1PV0S1sZRI-xYJLrgXFxR5_u0yCYpd9N8ZHRw7xVQXsCkM72JMvCtoFL7EHP8runs" });
  // const headers = {Authorization:localStorage.getItem('token')}
  useEffect(async () => {
    // 更新文档的标题
    const res = await queryID(window.location.href?.substring(window.location.href?.lastIndexOf("/") + 1))
    setRes(res)
    console.log(res);

  }, [ID]);
  const handleChange = (value) => {
    setValue(value);
  };


  const handleChanges = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        setLoading(
          false
        ),
        setImg(
          imageUrl
        )
      );
    }
  };

  const prompt = () => {
    notification.open({
      message: 'We got value:',
      description: <span dangerouslySetInnerHTML={{ __html: value }} />,
    });
  };
  // 弹框

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
  const uploadButton = (
    <div>
      {loadings ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (

    <Layout>
      <Row>
        <Col span={24}>
          <Card style={{ width: '80%', marginLeft: '20px' }}>
            <h1 style={{ fontWeight: 'bold' }}>分类名称</h1>
            {res?.name && <Input defaultValue={res.name} style={{ width: '30%' }} />}
            <Divider />
            <h1 style={{ fontWeight: 'bold' }}>商品图片</h1>
            {res?.thumbnail_url && <img src={res.thumbnail_url} style={{ width: '100px', height: '100px' }} />}
            <Upload
              name="avatar"
              headers={headers}
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/admin/attachments?format=object"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            <Divider />
            <Card title="分类描述">
              <ReactQuill value={value} onChange={handleChange} modules={modules}
                formats={formats} />
              <Button style={{ marginTop: 16 }} onClick={prompt}>
                提交
              </Button>
            </Card>
          </Card>,
        </Col>
      </Row>
      <Row type="flex" justify="center" align="middle" style={{ marginTop: '10px' }}>
        <Button type="primary" >保存</Button>
      </Row>



    </Layout>
  );
}
