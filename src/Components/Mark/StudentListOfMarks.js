import React, { useState, useEffect } from 'react';
import { Divider, List, Skeleton,message,Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Commons from '../../Utility/url';
import { useNavigate } from 'react-router-dom';
import checkToken from '../../Utility/CheckToken';

const StudentListOfMarks = () => {

  const navigate = useNavigate();
  const [listOfMarks, setListOfMarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = checkToken()
  const [messageApi, contextHolder] = message.useMessage();
  const [subjects, setSubjects] = useState({}); // Store subject details

  useEffect(() => {
    getAllMarksOfStudent();
  }, []);


  const getAllMarksOfStudent = async () => {
    if (loading) return;
    setLoading(true);

    if (!token) {
      console.error('No access token found');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Commons.baseUrl}/v1/mark/student`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setListOfMarks(data);
        const subjectPromises = data.map(item =>
            fetch(`${Commons.baseUrl}/v1/subject/${item.subject}`, {
              method: 'GET',
              headers: { 'Authorization': `Bearer ${token}` },
            }).then(res => res.ok ? res.json() : null)
          );
          
          const subjectData = await Promise.all(subjectPromises);
          setSubjects(subjectData.reduce((acc, subject) => {
            if (subject) acc[subject.id] = subject;
            return acc;
          }, {}));
      }
    } catch (error) {
      console.error('Failed to fetch marks:', error);
    } finally {
      setLoading(false);
    }
  };

  const subjectName = (subjectId) => {
    return subjects[subjectId]?.name || 'Loading...';
  };


  return (
    <div
      id="scrollableDiv"
      style={{
        height: 500,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
        width: "50%",
      }}
    >{contextHolder}
      <InfiniteScroll
        dataLength={listOfMarks.length}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={listOfMarks}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={subjectName(item.subject)}
                description={`Score: ${item.score}`}
              />
              <div onClick={() => navigate(`/mark_details/${item.id}`)}>Details</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default StudentListOfMarks;
