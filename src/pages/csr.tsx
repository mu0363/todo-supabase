import { useEffect, useState } from "react";
import { Layout } from "src/components/Layout";
import { supabase } from "src/libs/supabase";
import type { NextPage } from "next";
import type { Notice, Task } from "src/types";

const CSR: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const { data: tasks } = await supabase
        .from("todos")
        .select<"*", Task>("*")
        .order<keyof Task>("created_at", { ascending: true });
      if (tasks) {
        setTasks(tasks);
      }
    };

    const getNotices = async () => {
      const { data: notices } = await supabase
        .from("notices")
        .select<"*", Notice>("*")
        .order<keyof Notice>("created_at", { ascending: true });
      if (notices) {
        setNotices(notices);
      }
    };

    getTasks().catch((err) => console.log(err));
    getNotices().catch((err) => console.log(err));
  }, []);

  return (
    <Layout title="SSG + CSR">
      <p className="mb-3 text-blue-500">SSG + CSR</p>
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
    </Layout>
  );
};

export default CSR;
