import { Fragment } from "react"; // Позволяет группировать несколько элементов без добавления лишнего HTML

const posts = [
  { id: 1, title: "An update", body: "It's been a while since I posted..." },
  { id: 2, title: "My new blog", body: "I am starting a new blog!" },
];

function PostTitle({ title }: { title: string }) {
  return <h1>{title}</h1>;
}

function PostBody({ body }: { body: string }) {
  return (
    <article>
      <p>{body}</p>
    </article>
  );
}
const Fragments: React.FC = () => {
  return (
    <>
      {posts.map((post) => (
        <Fragment key={post.id}>
          <PostTitle title={post.title} />
          <PostBody body={post.body} />
        </Fragment>
      ))}
    </>
  );
};
export default Fragments;
