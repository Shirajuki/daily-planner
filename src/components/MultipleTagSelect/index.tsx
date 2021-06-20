import React from "react";
import { ITag } from "../../types";
import "./index.css";

type TagSelectType = {
  tag: ITag;
};
const TagSelect: React.FC<TagSelectType> = ({ tag }) => {
  return <button className="btn btn-select">{tag.tagName}</button>;
};
type MultipleTagSelectType = {
  tags: ITag[];
};
const MultipleTagSelect: React.FC<MultipleTagSelectType> = ({ tags }) => {
  return (
    <div className="multipleTagSelect">
      {tags.map((tag: ITag, index: number) => (
        <TagSelect key={index} tag={tag} />
      ))}
    </div>
  );
};
export default MultipleTagSelect;
