const initMocks = async () => {
  const opts: any = {
    onUnhandledRequest: "bypass",
  };

  if (typeof window === "undefined") {
    const { server } = await import("./server");
    server.listen(opts);
  } else {
    const { worker } = await import("./browser");
    await worker.start(opts);
  }
}

export default initMocks();