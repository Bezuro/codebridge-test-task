import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch: any = (url: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(url).then((res) => {
      console.log('res.data :>> ', res.data);
      setData(res.data);
    });
  }, [url]);

  return [data];
};

export default useFetch;
