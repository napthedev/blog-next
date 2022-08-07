import { FC, HTMLProps } from "react";

const Layout: FC<HTMLProps<HTMLDivElement>> = ({
  children,
  className,
  ...others
}) => {
  return (
    <div className={`flex justify-center mx-4 ${className || ""}`} {...others}>
      <div className="flex flex-col items-stretch w-full max-w-[700px] min-h-screen my-5 md:my-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;
