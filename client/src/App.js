import { useEffect, useState } from "react";
import Notice from "./components/Notice";
import { subscribeUser } from "./subscription";

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
      if (noticeData.data.find((notice) => notice.isNewNotice === true)) {
        subscribeUser();
      }
    }
    getNotice();
  }, []);

  return (
    <div>
      <h1>NoticeBoard OUTR</h1>
      {/* <button onClick={subscribeUser}>subscribe</button> */}
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
