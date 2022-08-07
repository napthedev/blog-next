import { FC, HTMLProps, createElement } from "react";

import { toKebabCase } from "@/utils/string";

const Heading: FC<
  HTMLProps<HTMLHeadingElement> & {
    level: 1 | 2 | 3 | 4 | 5 | 6;
  }
> = (props) => {
  return createElement(
    `h${props.level}`,
    {
      ...props,
      ...(typeof props.children === "string"
        ? {
            id: toKebabCase(props.children),
          }
        : {}),
    },
    props.children
  );
};

export default Heading;
