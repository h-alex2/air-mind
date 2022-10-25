import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import Header from '../Header';
import NavBar from '../Navbar';
import MindMapCard from '../MindMapCard';

import getPublicMindMapData, {
  updateMindMapData,
} from '../../service/mindMapRequests';
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
  }, [setMindMapData]);

  const renameHandler = useCallback(
    (authorId, mindMapId, updatedTitle) => {
      let updatedMindMap;

      const updatedMindmaps = mindMapData.map(mindMap => {
        const { _id: id } = mindMap;
        if (id === mindMapId) {
          updatedMindMap = { ...mindMap, title: updatedTitle };
          return updatedMindMap;
        }
        return mindMap;
      });
      setMindMapData(updatedMindmaps);

      return updateMindMapData(authorId, mindMapId, updatedMindMap);
    },
    [mindMapData],
  );

  return (
    <Wrapper>
      <Header />
      <NavBar />
      {currentError.message && (
        <ErrorMessage>{currentError.message}</ErrorMessage>
      )}
      <MindMapsWrapper>
        {mindMapData.map(mindMap => {
          const { _id: id } = mindMap;
          return (
            <MindMapCard
              key={id}
              mindMap={mindMap}
              renameTitleHandler={renameHandler}
            />
          );
        })}
      </MindMapsWrapper>
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
  grid-template-columns: repeat(auto-fit, minmax(330px, 350px));
  grid-template-rows: 320px 350px 320px;
  justify-content: center;
  column-gap: 20px;
  row-gap: 20px;
`;

const ErrorMessage = styled.div``;
