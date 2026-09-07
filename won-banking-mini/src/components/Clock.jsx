function Clock() {
  const now = new Date();
  return <span>{now.toLocaleTimeString("ko-KR")}</span>;
}

export default Clock;
