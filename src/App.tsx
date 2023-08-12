import React from 'react';
import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import BasicLayout from './layouts/BasicLayout';
// import Login from './views/login/login';
// import MenuPage from './views/menu';
import { ConfigProvider, App as AntdApp } from 'antd';
import Router from './router/router';

function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <Router />
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
