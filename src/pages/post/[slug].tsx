import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Post, allPosts } from "contentlayer/generated";
import { useEffect, useRef } from "react";

// @ts-ignore
import AnchorJS from "anchor-js";
import { BASE_URL } from "@/shared/constants";
import Heading from "@/components/Heading";
import Iframe from "@/components/Iframe";
import Image from "next/future/image";
import Layout from "../../components/Layout";
import Link from "next/link";
import Meta from "../../components/Meta";
import Script from "next/script";
import SocialShare from "@/components/SocialShare";
import { formatDate } from "@/utils/date";
import { useMDXComponent } from "next-contentlayer/hooks";
import { useRouter } from "next/router";

interface PostProps {
  post: Post;
  related: Post[];
}

const PostPage: NextPage<PostProps> = ({ post, related }) => {
  const MDXContent = useMDXComponent(post.body.code);
  const router = useRouter();
  const commentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anchors = new AnchorJS();
    anchors.add();

    commentContainerRef.current?.innerHTML &&
      (commentContainerRef.current.innerHTML = "");
    // @ts-ignore
    window?.FB?.XFBML?.parse();
  }, [router.asPath]);

  return (
    <>
      <Meta
        title={post.title}
        description={post.description}
        image={post.mainImage}
      />
      <Layout>
        <h1 className="text-4xl font-semibold dark:text-white">{post.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 my-3">
          {formatDate(post.createdAt)}
        </p>
        <div className="flex gap-2 flex-wrap">
          {post.categories.map((category) => (
            <Link key={category} href={`/category/${category.toLowerCase()}`}>
              <a className="text-primary border-primary border px-2 rounded hover:bg-primary hover:text-white transition duration-300">
                {category}
              </a>
            </Link>
          ))}
        </div>
        <SocialShare title={post.title} />
        <p className="text-lg">{post.description}</p>
        <article className="prose prose-lg dark:prose-invert prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-headings:mt-8 prose-headings:mb-6 prose-pre:p-4">
          <MDXContent
            components={{
              Iframe,
              img: (props: any) => (
                // Use next/image when it is ready
                <img
                  {...props}
                  className="max-w-full h-auto"
                  alt={props.alt || "Image"}
                />
              ),
              h1: (props: any) => <Heading {...props} level={1} />,
              h2: (props: any) => <Heading {...props} level={2} />,
              h3: (props: any) => <Heading {...props} level={3} />,
              h4: (props: any) => <Heading {...props} level={4} />,
              h5: (props: any) => <Heading {...props} level={5} />,
              h6: (props: any) => <Heading {...props} level={6} />,
              a: (props: any) =>
                props.href.startsWith("#") ? (
                  <a {...props} />
                ) : (
                  <a {...props} target="_blank" rel="noopener noreferrer" />
                ),
            }}
          />
        </article>
        <h1 className="mt-8 text-3xl">Bình luận</h1>

        <div
          ref={commentContainerRef}
          className="fb-comments my-3 bg-gray-100 px-3"
          data-href={`${BASE_URL}post/${router.query.slug}`}
          data-width="100%"
          data-numposts="5"
          data-order-by="reverse_time"
        ></div>

        <h1 className="mt-8 mb-3 text-3xl">Bài viết liên quan</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {related.map((post) => (
            <Link key={post.url} href={post.url}>
              <a className="flex gap-2 group">
                <Image
                  className="w-[70px] h-[70px] flex-shrink-0 group-hover:brightness-90 transition duration-300 border dark:border-gray-600"
                  src={post.mainImage}
                  width={70}
                  height={70}
                  alt=""
                />
                <div className="flex-grow">
                  <h1 className="line-clamp-3 group-hover:text-primary transition duration-300">
                    {post.title}
                  </h1>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </Layout>
      <Script
        id="facebook-comments"
        async
        defer
        crossOrigin="anonymous"
        src={`https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v13.0&appId=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&autoLogAppEvents=1`}
        strategy="lazyOnload"
      ></Script>
    </>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post)
    return {
      notFound: true,
    };

  // Get related posts by getting the posts with highest categories in common count
  const related = allPosts
    .sort((a, b) => {
      const categoriesInCommon = (arr1: string[], arr2: string[]) =>
        arr1.filter((value) => arr2.includes(value));
      const aInCommon = categoriesInCommon(a.categories, post.categories);
      const bInCommon = categoriesInCommon(b.categories, post.categories);
      return bInCommon.length - aInCommon.length;
    })
    .filter((post) => post._raw.flattenedPath !== slug)
    .slice(0, 4)
    .map(({ title, mainImage, url }) => ({
      title,
      mainImage,
      url,
    }));

  return {
    props: {
      post: {
        title: post.title,
        description: post.description,
        categories: post.categories,
        createdAt: post.createdAt,
        body: {
          code: post.body.code,
        },
      },
      related,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPosts.map((post) => post.url);
  return { paths, fallback: false };
};
