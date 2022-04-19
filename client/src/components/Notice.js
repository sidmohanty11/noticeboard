import "./Notice.css";

export default function Notice({ url, isNew = true, date, notice }) {
  return (
    <a href={url} className="card" target="_blank" rel="noreferrer">
      <p className="notice">
        {notice}
        {isNew && <span className="new">new</span>}
      </p>
      <p className="date">Date: {date}</p>
    </a>
  );
}
