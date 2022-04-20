import { useEffect, useState } from "react";
import Notice from "./components/Notice";

function App() {
  const [allNotice, setAllNotice] = useState([]);

  useEffect(() => {
    async function getNotice() {
      const data = await fetch("http://localhost:4000/api/notice/all", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const noticeData = await data.json();
      setAllNotice(noticeData.data);
    }
    getNotice();
  }, []);

  return (
    <div>
      <h1>NoticeBoard OUTR</h1>
      {allNotice.map((data) => (
        <Notice
          key={Math.random()}
          url={data.url}
          isNew={data.isNew}
          date={data.date}
          notice={data.notice}
        />
      ))}
    </div>
  );
}

export default App;
