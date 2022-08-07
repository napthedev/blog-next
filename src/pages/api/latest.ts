import { BASE_URL } from "@/shared/constants";
import { NextApiHandler } from "next";
import { allPosts } from "contentlayer/generated";

const handler: NextApiHandler = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  const result = allPosts
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5)
    .map((post) => ({
      title: post.title,
      url: `${BASE_URL}post/${post._raw.flattenedPath}`,
    }));

  res.send(result);
};

export default handler;
