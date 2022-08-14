import { Power1 } from "gsap";

const select = (elem) => document.querySelector(elem);
const selectAll = (elem) => Array.from(document.querySelectorAll(elem));
const create = (elem) => document.createElement(elem);

const defaulAnimationProps = ({
  transformOrigin = "left",
  duration = 0.8,
  ease = Power1.easeInOut,
}) => ({ transformOrigin, duration, ease });

export { select, selectAll, create, defaulAnimationProps };
