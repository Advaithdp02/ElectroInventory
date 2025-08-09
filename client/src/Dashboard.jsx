import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TableView from './components/TableView';
import './styles/Dashboard.css';
import Header from './components/Header';
import Footer from './components/Footer';

function Dashboard() {
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  return (
    <div className="dashboard-container">
      <Sidebar onSelectType={(type) => {
        setCategory(type);
        setPage(1);
      }} />
      <div className="main-content">
        <Header />
        <TableView type={category} page={page} setPage={setPage} />
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
