import React, { useState, useEffect } from 'react';
import { Divider, List, Skeleton,message } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Commons from '../../Utility/url';
import { useNavigate } from 'react-router-dom';
import checkToken from '../../Utility/CheckToken';

const ListOfMarks = () => {
  const navigate = useNavigate();
  const [listOfMarks, setListOfMarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState({}); // Store subject details
  const [students, setStudents] = useState({}); // Store student details
  const token = checkToken()
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    getAllMarksOfProfessor();
  }, []);

  const getAllMarksOfProfessor = async () => {
    if (loading) return;
    setLoading(true);

    if (!token) {
      console.error('No access token found');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${Commons.baseUrl}/v1/mark/professor`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setListOfMarks(data);

        // Fetch subjects for all marks
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

        // Fetch students for all marks
        const studentPromises = data.map(item =>
          fetch(`${Commons.baseUrl}/users/${item.student}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
          }).then(res => res.ok ? res.json() : null)
        );

        const studentData = await Promise.all(studentPromises);
        setStudents(studentData.reduce((acc, student) => {
          if (student) acc[student.id] = student;
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

  const studentName = (studentId) => {
    return students[studentId]?.fullName || 'Loading...';
  };
   let deleteMark=async(id)=>{

        let response = await fetch(Commons.baseUrl + `/v1/mark/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        })
        if(response.ok){
            messageApi.open({
              type: "success",
              content: 'You have successfully deleted a mark',
          });
        }else{
          messageApi.open({
            type: 'error',
            content: 'Error, can not delete a mark',
        });
        }
        
    }
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
            <List.Item
              actions={[
                <a key="edit"  onClick={() => navigate(`/edit_mark/${item.id}`)}>edit</a>,
                <a key="delete" onClick={() => deleteMark(item.id)} style={{ color: "red" }}>delete</a>,
              ]}
              key={item.id}
            >
              <List.Item.Meta
                title={<a>{subjectName(item.subject)}</a>}
                description={`Score: ${item.score}, Student: ${studentName(item.student)}`}
              />
              <div onClick={() => navigate(`/details/${item.id}`)}>Details</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default ListOfMarks;
