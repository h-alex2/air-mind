import React, { useState } from 'react';

import Image from 'next/image';
import styled from 'styled-components';

import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { RiDeleteBin6Line as RecycleBinIcon } from 'react-icons/ri';
import {
  clickedNodeId,
  isOpenNodeOptionModal,
  clickedImgPath,
  mindMapInfo,
  nodesInfo,
  userInfo,
  socketInfo,
  currentUserInfo,
} from '../../store/states';

import flexCenter from '../shared/flexcentercontainer';
import NodeImageDropZone from '../nodeimagedropzone';
import debounce from '../../utils/debounce';
import { putNodesData, deleteImagesData } from '../../service/noderequests';

export default function NodeDetail() {
  const [isVisibleBin, setIsVisibleBin] = useState(false);
  const [hoverImgPath, setHoverImgPath] = useState('');
  const [nodeData, setNodeData] = useRecoilState(nodesInfo);
  const userData = useRecoilValue(userInfo);
  const mindMapData = useRecoilValue(mindMapInfo);
  const nodeId = useRecoilValue(clickedNodeId);
  const socket = useRecoilValue(socketInfo);
  const currentUser = useRecoilValue(currentUserInfo);
  const isOpenNodeRightOptionMenu = useRecoilValue(isOpenNodeOptionModal);
  const setNodeRightOptionMode = useSetRecoilState(isOpenNodeOptionModal);
  const setClickedImagePath = useSetRecoilState(clickedImgPath);

  const { _id: userId } = userData;
  const { _id: mindMapId } = mindMapData;

  const writeTitleHandler = e => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      const tempData = { ...nodeData };

      tempData[nodeId] = { ...tempData[nodeId], title: e.target.value };

      setNodeData(tempData);

      debounce(() => {
        putNodesData(userId, mindMapId, nodeId, tempData[nodeId]);
      }, 1500);

      socket.emit('titleChange', mindMapId, nodeId, e.target.value);
    }
  };

  const writeDescriptionHandler = e => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      const tempData = { ...nodeData };

      tempData[nodeId] = { ...tempData[nodeId], content: e.target.value };

      setNodeData(tempData);

      debounce(() => {
        putNodesData(userId, mindMapId, nodeId, tempData[nodeId]);
      }, 1500);

      socket.emit('contentChange', mindMapId, nodeId, e.target.value);
    }
  };

  const addImageHandler = imageArray => {
    const tempData = { ...nodeData };
    tempData[nodeId] = { ...tempData[nodeId], images: imageArray };

    setNodeData(tempData);
  };

  const clickImageHandler = imgPath => {
    setClickedImagePath(imgPath);
  };

  const imgHoverHandler = id => {
    setHoverImgPath(id);
    setIsVisibleBin(true);
  };

  const imgHoverOutHandler = () => {
    setHoverImgPath('');
    setIsVisibleBin(false);
  };

  const imgDeleteHandler = async imgPath => {
    const updatedNode = await deleteImagesData(
      userId,
      mindMapId,
      nodeId,
      imgPath,
    );
    const tempData = { ...nodeData };
    tempData[nodeId] = { ...tempData[nodeId], images: updatedNode.node.images };
    setNodeData(tempData);
  };

  return (
    <Container isOpen={isOpenNodeRightOptionMenu}>
      <MenuBody className="closeButton">
        <Image
          src="/images/close.png"
          width="20px"
          height="20px"
          className="closeIcon"
          onClick={() => {
            setNodeRightOptionMode(false);
            socket.emit('leaveNode', socket.id, mindMapId);
          }}
        />
      </MenuBody>
      <ScrollWrapper>
        <Scroll>
          <MenuWrapper>
            <TitleMenu className="title">
              <MenuTitle>Title</MenuTitle>
              <TitleInput
                value={nodeData[nodeId]?.title || ''}
                onChange={writeTitleHandler}
              />
            </TitleMenu>
            <DescriptionMenu className="description">
              <MenuTitle>Description</MenuTitle>
              <DescriptionTextArea
                value={nodeData[nodeId]?.content || ''}
                onChange={writeDescriptionHandler}
              />
            </DescriptionMenu>
            <ImageMenu className="image">
              <MenuTitle>Image</MenuTitle>
              <NodeImageDropZone
                userId={userId}
                mindMapId={mindMapId}
                nodeId={nodeId}
                addImage={addImageHandler}
                className="dragZone"
              />
            </ImageMenu>
            <ImageList>
              <MenuTitle>Image List</MenuTitle>
              <ImagesWrapper>
                {nodeData[nodeId]?.images.map(img => {
                  const { _id: id } = img;
                  return (
                    <ImageWrapper
                      key={id}
                      onMouseEnter={() => imgHoverHandler(img.path)}
                      onMouseLeave={imgHoverOutHandler}
                    >
                      {isVisibleBin && hoverImgPath === img.path && (
                        <IconWrapper onClick={() => imgDeleteHandler(img.path)}>
                          <RecycleBinIcon size={22} className="bin" />
                        </IconWrapper>
                      )}
                      <NodeImg
                        src={img.path}
                        alt={img.originalName}
                        className="img"
                        onClick={() => clickImageHandler(img.path)}
                      />
                    </ImageWrapper>
                  );
                })}
              </ImagesWrapper>
            </ImageList>
          </MenuWrapper>
        </Scroll>
      </ScrollWrapper>
    </Container>
  );
}

const Container = styled(flexCenter)`
  flex-grow: 1;
  width: 100%;
  min-height: 500px;
  height: 100%;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.7);
  transform: ${props => (props.isOpen ? 'translateX(0)' : 'translateX(400px)')};
  transition: all 0.6s ease-in-out;

  .closeButton {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-grow: 0;
    min-height: 30px;
    max-height: 30px;
    cursor: pointer;
  }

  .closeIcon {
    margin: 10px;
    padding-right: 10px;
    border-bottom: 1px solid black;
  }
`;

const ScrollWrapper = styled.div`
  width: 100%;
  height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Scroll = styled.div`
  overflow: auto;
  flex-grow: 1;
`;

const MenuWrapper = styled.div`
  height: 100%;
  justify-content: flex-start;
  flex-grow: 1;
  width: 100%;
  min-height: 150px;
`;

export const MenuBody = styled(flexCenter)`
  justify-content: flex-start;
  flex-grow: 1;
  width: 100%;
  min-height: 150px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const MenuTitle = styled.div`
  width: 100%;
  margin: 10px 0 0 10px;
  font-size: 15px;
`;

const TitleMenu = styled(MenuBody)`
  justify-content: space-between;
  flex-grow: 0;
  min-height: 100px;
  max-height: 100px;
`;

const TitleInput = styled.input`
  width: 90%;
  height: 50px;
  border: 1px solid #eff0f5;
  border-radius: 10px;
  margin: 10px 0;
  background-color: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #529cca inset;
  }
`;

const DescriptionMenu = styled(MenuBody)`
  flex-grow: 0;
  min-height: 200px;
`;

const DescriptionTextArea = styled.textarea`
  margin: 10px 0;
  width: 90%;
  height: 150px;
  max-height: 500px;
  border: 1px solid #eff0f5;
  border-radius: 10px;
  resize: none;
  background-color: rgba(255, 255, 255, 0.8);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #529cca inset;
  }
`;

const ImageMenu = styled(MenuBody)``;

const ImagesWrapper = styled(flexCenter)`
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px 0;
`;

const ImageList = styled(MenuBody)`
  flex-grow: 1;
  height: 100%;

  .img {
    margin: 0 5px;
  }
`;

const ImageWrapper = styled(flexCenter)`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin: 10px 0;
  position: relative;

  width: 130px;
  /* height: 100px; */
`;

const IconWrapper = styled.div`
  text-align: right;
  position: absolute;
  width: 100px;
  margin: 5px 15px 0 0;
  z-index: 4;
  font-weight: 900;
  cursor: pointer;

  .bin {
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 5px;
    color: black;

    &:hover {
      color: #a00000;
    }
  }
`;

const NodeImg = styled.img`
  width: 130px;
  margin: 20px;
  cursor: pointer;
`;
