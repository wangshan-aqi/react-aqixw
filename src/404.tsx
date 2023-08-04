import { Link } from 'react-router-dom';
import { Button, Result } from 'antd';

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，你访问的页面不存在。"
      extra={
        <Link to="/">
          <Button type="primary">返回首页</Button>
        </Link>
      }
    >
      {/* <Link to="/">
        <Button type="primary">返回首页</Button>
      </Link> */}
    </Result>
  );
};

export default NotFound;
