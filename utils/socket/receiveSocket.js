const receiveSocket = (socket, setNodeData) => {
  socket.on('receiveColor', (nodeId, color) => {
    console.log(nodeId, color);

    setNodeData(prev => {
      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      tempSel.attribute = {
        ...tempSel.attribute,
        color,
      };
      temp[nodeId] = tempSel;

      return temp;
    });
  });

  socket.on('receiveTitle', (nodeId, updatedContent) => {
    setNodeData(prev => {
      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      tempSel.title = updatedContent;
      temp[nodeId] = tempSel;

      return temp;
    });
  });

  socket.on('receiveContent', (nodeId, updatedDescription) => {
    setNodeData(prev => {
      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      tempSel.content = updatedDescription;
      temp[nodeId] = tempSel;

      return temp;
    });
  });

  socket.on('receivePosition', (nodeId, updatedPositionX, updatedPositionY) => {
    console.log(
      '🐶 ~ file: receiveSocket.js ~ line 45 ~ socket.on ~ updatedPositionX',
      updatedPositionX,
    );
    setNodeData(prev => {
      const temp = { ...prev };
      const tempSel = { ...temp[nodeId] };

      tempSel.attribute = {
        ...tempSel.attribute,
        cordX: updatedPositionX,
        cordY: updatedPositionY,
      };

      temp[nodeId] = tempSel;

      return temp;
    });
  });
};

export default receiveSocket;
