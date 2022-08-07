import { FC } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const Navbar: FC = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div className="h-14 shadow dark:shadow-gray-600 flex justify-between items-center px-6">
      <Link href="/">
        <a className="flex items-center gap-2">
          <img className="h-8 w-8 rounded-full" src="/avatar.jpg" alt="" />
          <h1 className="text-lg">NAPTheDev{"'"}s Blog</h1>
        </a>
      </Link>
      {resolvedTheme === "light" ? (
        <button title="Enable dark mode" onClick={() => setTheme("dark")}>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="#000"
              d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z"
            />
          </svg>
        </button>
      ) : (
        <button title="Disable dark mode" onClick={() => setTheme("light")}>
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#fff"
              d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3zM5.637 19.778l-1.414-1.414 2.121-2.121 1.414 1.414zM16.242 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.344 7.759 4.223 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Navbar;
