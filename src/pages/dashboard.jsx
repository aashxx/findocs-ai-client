import { AuthContext } from '@/contexts/AuthContext';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, []);

  return (
    <main>
        Dashboard
    </main>
  )
}

export default Dashboard;
