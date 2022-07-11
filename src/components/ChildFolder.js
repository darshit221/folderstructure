import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function ChildFolder({ folder, setChildVal, allFolders }) {
  const [typeToggle, setTypeToggle] = useState(false);
  const [inputToggle, setInputToggle] = useState(false);
  const [ChildFolderObj, setChildFolderObj] = useState({
    id: "",
    type: "",
    name: "",
    children: [],
  });
  const [allChildFolder, setAllChildFolder] = useState([]);

  const deleteFolderHandler = (value) => {
    const filterData = allFolders.filter((val) => val.id !== value);
    setChildVal(filterData);
  };

  const addChildFolderHandler = () => {
    setChildFolderObj({ ...ChildFolderObj, id: uuidv4() });

    if (ChildFolderObj.name) {
      setChildVal((prev) => {
        folder.children.push(ChildFolderObj);
        return [...prev];
      });
      setAllChildFolder([...allChildFolder, ChildFolderObj]);
    }
    setInputToggle(false);
    setTypeToggle(false);
    setChildFolderObj({
      id: "",
      type: "",
      name: "",
      children: [],
    });
  };

  const cancelInput = () => {
    setInputToggle(false);
    setInputToggle(false);
  };

  return (
    <div key={folder.id}>
      <div>
        <div>
          <div>
            <ul>
              <li style={{ display: "flex" }}>
                <div>
                  {folder.type === "file" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="black"
                      width="25"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="yellow"
                      viewBox="0 0 24 24"
                      stroke="yellow"
                      stroke-width="2"
                      width="25"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  )}
                </div>
                <div>{folder.name}</div>
                <div>
                  {folder.type !== "file" && (
                    <svg
                      onClick={() => setTypeToggle(!typeToggle)}
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      width="25"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="red"
                    viewBox="0 0 24 24"
                    stroke="red"
                    stroke-width="2"
                    width="25"
                    onClick={() => deleteFolderHandler(folder.id)}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {typeToggle && (
          <div>
            <button
              onClick={() => {
                setChildFolderObj({ ...ChildFolderObj, type: "file" });
                setInputToggle(true);
                setTypeToggle(false);
              }}
            >
              file
            </button>
            <button
              onClick={() => {
                setChildFolderObj({ ...ChildFolderObj, type: "folder" });
                setInputToggle(true);
                setTypeToggle(false);
              }}
            >
              folder
            </button>
          </div>
        )}
        {inputToggle && (
          <div>
            <input
              type="text"
              value={ChildFolderObj.name}
              onChange={(e) =>
                setChildFolderObj({
                  ...ChildFolderObj,
                  name: e.target.value,
                  id: uuidv4(),
                })
              }
            />

            {folder.type !== "file" && (
              <svg
                onClick={() => addChildFolderHandler()}
                width="25 "
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="green"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              onClick={() => cancelInput()}
              fill="red"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        )}
      </div>

      {allChildFolder &&
        allChildFolder.map((chl) => (
          <div style={{ marginLeft: "20px" }}>
            <ChildFolder
              folder={chl}
              setChildVal={setAllChildFolder}
              allFolders={allChildFolder}
            />
          </div>
        ))}
    </div>
  );
}

export default ChildFolder;
