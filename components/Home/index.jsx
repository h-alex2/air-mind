import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import Header from '../Header';
import NavBar from '../Navbar';
import MindMapCard from '../MindMapCard';

import getPublicMindMapData from '../../service/mindMapRequests';
import { errorInfo } from '../../store/states';

export default function Home() {
  const [mindMapData, setMindMapData] = useState([]);
  const setCurrentError = useSetRecoilState(errorInfo);
  const currentError = useRecoilValue(errorInfo);

  useEffect(() => {
    const fetchPublicMindMapData = async () => {
      try {
        const data = await getPublicMindMapData();

        setMindMapData(data.mindMap);
      } catch (error) {
        setCurrentError(error);
      }
    };
    fetchPublicMindMapData();
  }, []);

  const mindMapList = mindMapData.map(mindMap => {
    const { _id: id } = mindMap;
    return (
      <MindMapCard
        key={id}
        mindMap={mindMap}
        title={mindMap.title}
        access={mindMap.access}
        author={mindMap.author}
      />
    );
  });

  return (
    <Wrapper>
      <Header />
      <NavBar />
      {currentError.message && (
        <ErrorMessage>{currentError.message}</ErrorMessage>
      )}
      <MindMapsWrapper>{mindMapList}</MindMapsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const MindMapsWrapper = styled.div`
  display: grid;
  padding: 2em 0 0;
  width: 90%;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: 300px 300px 300px;
  column-gap: 20px;
  row-gap: 20px;
`;

const ErrorMessage = styled.div``;
