import { FC, HTMLProps } from "react";

const Iframe: FC<HTMLProps<HTMLIFrameElement>> = (props) => {
  if (props.src?.startsWith("https://www.youtube.com/embed")) {
    return (
      <div className="w-full h-0 pb-[56.25%] relative">
        <iframe
          {...props}
          className="absolute inset-0 w-full h-full"
          title={props.title || "Embed"}
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  return (
    <div className="w-full h-0 pb-[56.25%] relative">
      <iframe
        {...props}
        className="absolute inset-0 w-full h-full"
        title={props.title || "Embed"}
        frameBorder={0}
      ></iframe>
    </div>
  );
};

export default Iframe;
