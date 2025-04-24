/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setDetailArticle } from '../redux/features/data/dataSlices';
import { useSelector } from 'react-redux';

import axios from 'axios';
const API_URL = import.meta.env.VITE_API_AUTH_URL

const useFetchArticlebySlug = (slug) => {
  const dispatch = useDispatch();
  const articleData = useSelector((state) => state.data.detailArticle);
    
  const fetchData = useCallback(async () => {
    if (!slug || slug.trim() === "") {
      return;
    }
    console.log(articleData, slug);
    try {
      const response = await axios.get(`${API_URL}/api/v1/public/article/${slug}?with=user,category`, {
            timeout: 15000,
        }
        );
      if (response.status === 200) {
        dispatch(setDetailArticle({slug:slug, data:response.data?.data}));
      }
    } catch (error) {
      console.error('Error during get data:', error);
    } 
  }, [dispatch, slug])
  
  useEffect(() => {
    fetchData();
  }, [slug]);
};

export default useFetchArticlebySlug;
