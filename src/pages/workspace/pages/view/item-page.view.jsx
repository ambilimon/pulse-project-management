import React, { useEffect, useState } from "react";
import cx from "classnames";
import Validator from "../../../../helper/validator";
import useWorkspace from "../../hook/use-workspace.hook";
import CustomDropDown from "../../../../components/custom_dropdown";
import CustomEditor from "../../../../components/compound/editorjs/editor";
import { Fold } from "../../../../helper/typescript-utils";
import { Article } from "../../../../components/compound/editorjs/parser/editorjs-block";
import SvgIcon from "../../../../components/svg-icon/svg-icon";
import { Link, useLocation } from "react-router-dom";

export default function ItemPage({ item }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState();
  const [displayEditors, setDisplayEditors] = useState(false);
  const { deleteCollection, updateCollection, allCollection } = useWorkspace();

  useEffect(() => {
    if (Validator.hasValue(item)) {
      setTitle(item.title);
      setContent(item.content);
    }
  }, [item]);

  const currentCollection = allCollection.find((c) => c.id === item.parent);
  const path = useLocation().pathname.split("/");

  const onKeyDown = (e) => {
    if (e.metaKey && e.which === 83) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  });

  function handleSubmit(e) {
    e.preventDefault();
    updateCollection({
      id: item.id,
      title,
      content,
      parent: item.parent,
    });
  }

  return (
    <div className="flex flex-col gap-3 h-full  py-5">
      <div className="flex items-center place-content-between">
        <div className="flex items-center gap-2">
          <SvgIcon icon="Copy" size={3} className="h-5" />
          <Link to={`/${path[1]}/${path[2]}/${path[3]}/${item.parent}`}>
            <div className="text-slate-400 text-xs">
              {currentCollection.title}{" "}
            </div>
          </Link>
          {/* <CustomDropDown
            button={<div className="text-slate-400 text-xs"> Collection</div>}
          >
            <ListView
              items={allCollection}
              renderItem={(item) => (
                <div
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-all ease-in duration-200"
                  onClick={() => {
                    // deleteCollection(item.id, item.parent);
                  }}
                >
                  {item.title}
                </div>
              )}
            />
          </CustomDropDown> */}
        </div>

        <CustomDropDown
          button={<SvgIcon icon="VerticalEllipse" size={4} className="h-5" />}
        >
          <div className="flex flex-col gap-2">
            <div
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer transition-all ease-in duration-200"
              onClick={() => {
                deleteCollection(item.id, item.parent);
              }}
            >
              Delete
            </div>
          </div>
        </CustomDropDown>
      </div>
      <div className="flex flex-col bg-white px-16 py-10 rounded-lg shadow-md">
        <form id={item.id} onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="w-full bg-transparent font-semibold text-4xl"
          />
          <div className="Editor_Wrapper">
            <Fold
              value={!displayEditors ? "content" : null}
              ifPresent={(v) => (
                <CustomEditor
                  reInitOnPropsChange={() => item.id}
                  initialData={item && item.content && item.content}
                  placeholder="Let's write an awesome story!"
                  autofocus={true}
                  onReady={() => {
                    // console.log("Editor is ready ");
                  }}
                  onData={(data) => {
                    setContent(data);
                  }}
                />
              )}
              ifAbsent={() => (
                <Article data={content && content.blocks && content.blocks} />
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
