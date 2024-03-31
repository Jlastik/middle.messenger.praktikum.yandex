import "./global.pcss";
import Block from "./utils/block.ts";
import { router } from "./router.ts";

function render(query: string, block: Block | null) {
  const root = document.querySelector(query);
  const element = block?.getContent();
  if (root && element) {
    root.appendChild(element);
    //Зачем?
    block && block.dispatchComponentDidMount();
  }
  return root;
}

const currentPath = window.location.pathname;

console.log(currentPath);

render("#app", router.find((el) => el.path === currentPath)?.element || null);
