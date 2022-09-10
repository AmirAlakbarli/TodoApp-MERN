const today = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.toLocaleString("en-us", { month: "short" });
  const week = today.toLocaleString("en-us", { weekday: "short" });
  const day =
    today.getDate() < 10
      ? "0" + today.getDate().toString()
      : today.getDate().toString();

  return week + " " + month + " " + day + " " + year;
};

export default today;
