/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/features/app/appSlices';
import { setArticle } from '../redux/features/data/dataSlices';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_AUTH_URL

const useFetchArticles = ({searchValue, page}) => {
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${API_URL}/api/v1/public/article?search${searchValue}=&page=${page}&page_size=10&with=category`, {
            timeout: 15000,
        }
        );
      if (response.status === 200) {
        dispatch(setArticle(response.data.data));
      }
    } catch (error) {
      console.error('Error during get balance:', error.response.message);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, searchValue, page])
  
  useEffect(() => {
    fetchData();
  }, [page, searchValue]);
};

export default useFetchArticles;
