import { Spin } from 'antd';

const GloablLoading: React.FC<any> = () => (
  <div className="w-[100vw] h-[100vh] flex justify-center items-center">
    <Spin size="large" />
    <div className="loading transform translate-y-[-12vh]"></div>
  </div>
);

export default GloablLoading;
