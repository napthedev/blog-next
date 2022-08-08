import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Post, allPosts } from "contentlayer/generated";

import Image from "next/future/image";
import Layout from "@/components/Layout";
import Link from "next/link";
import Meta from "@/components/Meta";
import { formatDate } from "@/utils/date";

interface CategoryProps {
  posts: Post[];
  categoryName: string;
}

const Category: NextPage<CategoryProps> = ({ posts, categoryName }) => {
  return (
    <>
      <Meta
        title={`Danh mục: ${categoryName}`}
        description="NAPTheDev's Blog"
        image="/avatar.jpg"
      />
      <Layout>
        <h1 className="text-3xl">Danh mục: {categoryName}</h1>

        {posts.map((post, index) => (
          <div
            key={post.url}
            className={`flex gap-4 py-4 ${
              index === 0 ? "" : "border-t dark:border-gray-600"
            }`}
          >
            <Link href={post.url}>
              <a
                className="flex-shrink-0 hover:brightness-90 transition duration-300"
                title={post.title}
              >
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
                <a
                  className="text-primary text-xl md:text-2xl hover:brightness-125 transition duration-300 line-clamp-1 sm:line-clamp-2"
                  title={post.title}
                >
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
      </Layout>
    </>
  );
};

export default Category;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const posts = allPosts
    .filter((post) =>
      post.categories.some((category) => category.toLowerCase().includes(slug))
    )
    .map(({ title, description, mainImage, categories, url, createdAt }) => ({
      title,
      description,
      mainImage,
      categories,
      url,
      createdAt,
    }))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  if (posts.length === 0)
    return {
      notFound: true,
    };

  const categoryName = posts[0].categories.find(
    (item) => item.toLowerCase() === slug
  );

  return {
    props: {
      posts,
      categoryName,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Array.from(
      new Set(
        allPosts.reduce(
          (acc, current) => [...acc, ...current.categories],
          [] as string[]
        )
      )
    ).map((item) => ({
      params: { slug: item.toLowerCase() },
    })),
    fallback: false,
  };
};
