import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ChildFolder from "./ChildFolder";

function RootFolder() {
  const [addFolderToggle, setAddFolderToggle] = useState(false);
  const [rootFolderObj, setRootFolderObj] = useState({
    id: "",
    type: "folder",
    name: "",
    children: [],
  });
  const [allFolder, setAllFolder] = useState([]);

  const addFolderHandler = () => {
    if (rootFolderObj.name) {
      setAllFolder([...allFolder, rootFolderObj]);
    }
    setAddFolderToggle(false);
    setRootFolderObj({
      id: "",
      type: "",
      name: "",
      children: [],
    });
  };
  const deleteFolderHandler = () => {};

  return (
    <div>
      <h1>Folder Structure</h1>

      <button onClick={() => setAddFolderToggle(!addFolderToggle)}>
        Add folder to root
      </button>
      {addFolderToggle && (
        <div>
          <input
            type="text"
            value={rootFolderObj.name}
            onChange={(e) =>
              setRootFolderObj({
                ...rootFolderObj,
                name: e.target.value,
                id: uuidv4(),
              })
            }
          />
          <button onClick={() => addFolderHandler()}>Add</button>
          <button onClick={() => deleteFolderHandler()}>Delete</button>
        </div>
      )}
      {allFolder.map((folder) => {
        return (
          <>
            <ChildFolder
              key={folder.id}
              folder={folder}
              setChildVal={setAllFolder}
              allFolders={allFolder}
            />
            <p>{JSON.stringify(folder)}</p>
          </>
        );
      })}
    </div>
  );
}

export default RootFolder;
