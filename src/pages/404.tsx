import Link from "next/link";
import Meta from "../components/Meta";
import type { NextPage } from "next";

const NotFound: NextPage = () => {
  return (
    <>
      <Meta
        title="404 Not Found"
        description="NAPTheDev's Blog"
        image="/sad-avatar.png"
      />
      <div className="min-h-screen flex flex-col justify-center items-center gap-4">
        <img className="w-[200px] h-[200px]" src="/sad-avatar.png" alt="" />
        <h1 className="text-2xl">404 Not Found</h1>
        <Link href="/">
          <a className="text-primary">Về trang chủ</a>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
