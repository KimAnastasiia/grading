import React, { useState, useEffect } from 'react';
import Commons from './Utility/url';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

let ListOfMarks = () => {

    let [listOfMarks, setListOfMarks] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getInvitations()
    }, [])

    let getInvitations = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const token = localStorage.getItem("access_token");
        if (!token) {
            console.error("No access token found");
            setLoading(false);
            return;
        }
        const response = await fetch(`${Commons.baseUrl}/v1/mark`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
            let data = await response.json()
            setListOfMarks(data)
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
          width:"50%"
        }}
      >
        <InfiniteScroll
          dataLength={listOfMarks.length}
          loader={
            <Skeleton
              avatar
              paragraph={{
                rows: 1,
              }}
              active
            />
          }
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={listOfMarks}
            renderItem={(item) => (
              <List.Item    actions={[<a >edit</a>, 
                                     <a style={{color:"red"}}>delete</a>
                                    ]} 
                            key={item.id}>
                                
                <List.Item.Meta
              
                  title={<a href="https://ant.design">{item.description}</a>}
                  description={item.score}
                />
                <div>Details</div>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    )
}


export default ListOfMarks;