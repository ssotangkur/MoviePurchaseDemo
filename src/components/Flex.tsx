import React from "react";
import classNames from "classnames";
import "./Flex.scss";

export type FlexProps = {
  children: React.ReactNode;
  className?: string;
  stretch?: boolean;
  inline?: boolean;
};

const FlexFactory = (...classes: string[]) => {
  return ({
    children,
    className,
    stretch = false,
    inline = false
  }: FlexProps) => (
    <div
      className={classNames(
        ...classes,
        className,
        { stretch: stretch },
        { inline: inline }
      )}
    >
      {children}
    </div>
  );
};

export const FlexRow = FlexFactory("flex", "row");
export const FlexColumn = FlexFactory("flex", "column");
