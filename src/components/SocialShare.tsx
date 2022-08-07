import { BASE_URL } from "../shared/constants";
import { FC } from "react";
import { useRouter } from "next/router";

interface SocialShareProps {
  title: string;
}

const providers: {
  icon: string;
  link: (url: string, title: string) => string;
}[] = [
  {
    icon: "/share-icon/facebook.svg",
    link: (url, title) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}&t=${title}`,
  },
  {
    icon: "/share-icon/twitter.svg",
    link: (url, title) =>
      `http://twitter.com/share?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
  },
  {
    icon: "/share-icon/reddit.svg",
    link: (url, title) =>
      `http://www.reddit.com/submit?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
  },
  {
    icon: "/share-icon/email.svg",
    link: (url, title) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${url}`,
  },
];

const SocialShare: FC<SocialShareProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div className="flex gap-2 flex-wrap my-3">
      {providers.map((provider) => (
        <a
          key={provider.icon}
          href={provider.link(`${BASE_URL}${router.asPath}`, title)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="h-8 w-8 object-cover" src={provider.icon} alt="" />
        </a>
      ))}
    </div>
  );
};

export default SocialShare;
