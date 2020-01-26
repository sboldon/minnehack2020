import React, { useEffect } from 'react';
import axios from 'axios';

export default function TestApi() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/testAPI');
      console.log(res.data);
    };
    fetchData();
  }, []);

  return <div />;
}
