"use client";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import React, { useState } from "react";

interface InplaceDisplayProps {
  children: ReactNode;
  onClick?: () => void;
}

export const InplaceDisplay: React.FC<InplaceDisplayProps> = ({
  children,
  onClick,
}) => {
  return <Slot onClick={onClick}>{children}</Slot>;
};

interface InplaceContentProps {
  children: ReactNode;
}

export const InplaceContent: React.FC<InplaceContentProps> = ({ children }) => {
  return <Slot>{children}</Slot>;
};

interface InplaceCloseProps {
  onClick?: () => void;
  children: ReactNode;
}
export const InplaceClose: React.FC<InplaceCloseProps> = ({
  onClick,
  children,
}) => {
  return <Slot onClick={onClick}>{children}</Slot>;
};

export type InplaceProps = ComponentPropsWithoutRef<"div">;

export const Inplace: React.FC<InplaceProps> = ({
  children,
  className,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDisplayClick = () => {
    setIsEditing(true);
  };
  const handleClose = () => {
    setIsEditing(false);
  };

  return (
    <div tabIndex={0} {...props} className={cn("flex gap-1", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === InplaceDisplay && !isEditing) {
            return React.cloneElement(child, {
              onClick: handleDisplayClick,
            } as any);
          }
          if (child.type === InplaceContent && isEditing) {
            return child;
          }
          if (child.type === InplaceClose && isEditing) {
            return React.cloneElement(child, { onClick: handleClose } as any);
          }
        }
        return null;
      })}
    </div>
  );
};
