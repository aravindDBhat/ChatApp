const date = new Date().toLocaleString("en-us", {
  month: "long",
  year: "numeric",
  day: "numeric",
});

function Day() {
  return (
    <div style={{ textAlign: "center" }}>
      <h5>. . . . . {date} . . . . .</h5>
    </div>
  );
}
export default Day;
