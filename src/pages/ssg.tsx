import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "src/components/Layout";
import { supabase } from "src/libs/supabase";
import type { GetStaticProps, NextPage } from "next";
import type { Notice, Task } from "src/types";

type StaticProps = {
  tasks: Task[];
  notices: Notice[];
};

const SSG: NextPage<StaticProps> = (props) => {
  const router = useRouter();
  const { tasks, notices } = props;

  return (
    <Layout title="SSG">
      <p className="mb-3 text-blue-500">SSG</p>
      <ul className="mb-3">
        {tasks.map((task) => (
          <li key={task.id}>
            <p className="text-lg font-extrabold">{task.title}</p>
          </li>
        ))}
      </ul>
      <ul className="mb-3">
        {notices.map((notice) => (
          <li key={notice.id}>
            <p className="text-lg font-extrabold">{notice.content}</p>
          </li>
        ))}
      </ul>
      <Link href="/ssr" prefetch={false}>
        <a className="mb-3 text-xs">Link to SSR</a>
      </Link>
      <button className="mb-3 text-xs" onClick={() => router.push("/ssr")}>
        Route to SSR
      </button>
    </Layout>
  );
};

export default SSG;

export const getStaticProps: GetStaticProps = async () => {
  console.log("SSG invoked!!");
  const { data: tasks } = await supabase
    .from("images")
    .select<"*", Task>("*")
    .order<keyof Task>("created_at", { ascending: true });
  const { data: notices } = await supabase
    .from("notices")
    .select<"*", Notice>("*")
    .order<keyof Notice>("created_at", { ascending: true });

  return { props: { tasks: tasks ?? [], notices: notices ?? [] } };
};
