import type { GetStaticProps, NextPage } from "next";
import { Post, allPosts } from "contentlayer/generated";

import Image from "next/future/image";
import Layout from "@/components/Layout";
import Link from "next/link";
import Meta from "@/components/Meta";
import { formatDate } from "@/utils/date";

interface HomeProps {
  posts: Post[];
  categories: string[];
}

const Home: NextPage<HomeProps> = ({ posts, categories }) => {
  return (
    <>
      <Meta
        title="NAPTheDev's Blog"
        description="Blog của Phong Nguyễn"
        image="/avatar.jpg"
      />
      <Layout>
        {posts.map((post, index) => (
          <div
            key={post.url}
            className={`flex gap-4 py-4 ${
              index === 0 ? "" : "border-t dark:border-gray-600"
            }`}
          >
            <Link href={post.url}>
              <a className="flex-shrink-0 hover:brightness-90 transition duration-300">
                <Image
                  className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] border dark:border-gray-600"
                  src={post.mainImage}
                  alt=""
                  width={150}
                  height={150}
                />
              </a>
            </Link>
            <div>
              <Link href={post.url}>
                <a className="text-primary text-xl md:text-2xl hover:brightness-125 transition duration-300 line-clamp-1 sm:line-clamp-2">
                  {post.title}
                </a>
              </Link>
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
                {formatDate(post.createdAt)}
              </p>
              <p className="text-sm md:text-base line-clamp-2 sm:line-clamp-3">
                {post.description}
              </p>
            </div>
          </div>
        ))}

        <div className="flex gap-x-2 flex-wrap">
          <p>Categories: </p>
          {categories.map((category) => (
            <Link key={category} href={`/category/${category.toLowerCase()}`}>
              <a className="text-primary">{category}</a>
            </Link>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: allPosts
        .map(
          ({ title, description, mainImage, categories, url, createdAt }) => ({
            title,
            description,
            mainImage,
            categories,
            url,
            createdAt,
          })
        )
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
      categories: Array.from(
        new Set(
          allPosts.reduce(
            (acc, current) => [...acc, ...current.categories],
            [] as string[]
          )
        )
      ),
    },
  };
};
