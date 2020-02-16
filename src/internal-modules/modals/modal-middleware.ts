export default function middleware() {
  let resolver: any;

  function shouldHandleAction(action: any): boolean {
    return action.type === "SHOW_MODAL" || action.type === "HIDE_MODAL";
  }

  function handleModalAction(action: any) {
    if (action.type === "SHOW_MODAL") {
      return new Promise(resolve => (resolver = resolve));
    }

    if (action.type === "HIDE_MODAL") {
      if (typeof resolver !== "function") {
        return false;
      }

      resolver(action.modalResult);
      resolver = undefined;
    }
  }

  return (next: any) => (action: any) => {
    if (shouldHandleAction(action)) {
      next(action);

      return handleModalAction(action);
    }

    return next(action);
  };
}
