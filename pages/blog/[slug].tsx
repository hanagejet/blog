import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getPostBySlug, getAllPosts } from '../../lib/api';
import Head from 'next/head';
import markdownToHtml from '../../lib/markdownToHtml';
import { Post as TPost } from '../../types/post';
import { Article } from '../../components/Article';
import { Layout } from '../../components/Layout';

interface Props {
  post: TPost;
  morePosts: TPost[];
  preview?: boolean;
}

interface Params {
  params: {
    slug: string;
  };
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'content']);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((posts) => {
      return {
        params: {
          slug: posts.slug,
        },
      };
    }),
    fallback: false,
  };
}

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      {router.isFallback ? (
        <>Loading…</>
      ) : (
        <>
          <Head>
            <title>{post.title} | blog</title>
          </Head>
          <Article post={post} />
        </>
      )}
    </Layout>
  );
};

export default Post;
