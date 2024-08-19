import React, { useState, useEffect } from 'react';
import { Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Commons from '../../Utility/url';
import { useNavigate } from 'react-router-dom';
import checkToken from '../../Utility/CheckToken';

const ListOfSubjectsOfProfessor = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]); // Initialize as an array


  const token = checkToken();

  useEffect(() => {
    getAllSubjectsOfProfessor();
  }, []);

  const getAllSubjectsOfProfessor = async () => {
    if (loading) return;
    setLoading(true);

    if (!token) {
      console.error('No access token found');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Commons.baseUrl}/v1/subject/by-user`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSubjects(data);

      } else {
        console.error('Failed to fetch subjects:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 500,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
        width: '50%',
      }}
    >
      <InfiniteScroll
        dataLength={subjects.length}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={subjects}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a href={'/edit_subject/'+item.id} key="edit">edit</a>,
              ]}
              key={item.id}
            >
              <List.Item.Meta
                title={item.name}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default ListOfSubjectsOfProfessor;
