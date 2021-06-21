import React, { useEffect, useRef } from "react";
import { ITag, ITagSettings } from "../../types";
import "./index.css";

type TagSelectType = {
  tag: ITag;
  selected: boolean;
  selectTagHandler: (id: number) => void;
};
const TagSelect: React.FC<TagSelectType> = ({
  tag,
  selected,
  selectTagHandler,
}) => {
  const tagRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (tagRef.current) {
      if (selected) tagRef.current.style.backgroundColor = tag.tagColor;
      else tagRef.current.style.backgroundColor = "";
    }
  }, [tag, selected, tagRef]);
  return (
    <button
      className="btn btn-select"
      ref={tagRef}
      onClick={() => selectTagHandler(tag.id)}
    >
      {tag.tagName}
    </button>
  );
};
type MultipleTagSelectType = {
  tags: ITagSettings;
  setTags: (tag: ITagSettings) => void;
};
const MultipleTagSelect: React.FC<MultipleTagSelectType> = ({
  tags,
  setTags,
}) => {
  const selectTagHandler = (id: number) => {
    const index: number = tags.selected.indexOf(id);
    const selected: number[] = [...new Set([...tags.selected, id])];
    // Toggle effect: remove if already exists
    if (index !== -1) selected.splice(index, 1);
    const newTags: ITagSettings = { ...tags, selected: selected };
    setTags(newTags);
  };
  return (
    <div className="multipleTagSelect">
      {tags?.tags.map((tag: ITag, index: number) => (
        <TagSelect
          key={index}
          tag={tag}
          selected={(tags?.selected.indexOf(tag.id) ?? -1) !== -1}
          selectTagHandler={selectTagHandler}
        />
      ))}
    </div>
  );
};
export default MultipleTagSelect;
