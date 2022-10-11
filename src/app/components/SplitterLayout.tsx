import { useState } from "react";
import { classSplitter } from "../utils/classSplitter";

const SplitterLayout = ({
  id = "drag-bar",
  dir,
  isDragging,
  ...props
}: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      id={id}
      data-testid={id}
      tabIndex={0}
      className={classSplitter(
        "splitter-drag-bar",
        dir === "horizontal" && "splitter-drag-bar--horizontal",
        (isDragging || isFocused) && "splitter-drag-bar--dragging"
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

export default SplitterLayout;
