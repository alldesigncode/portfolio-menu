import { select } from "./helpers";
import { ScrollBarConfig } from "./ScrollbarConfig";
import { Portfolio } from "./Portfolio";

window.addEventListener("load", () => {
  const content = select(".list");

  const portfolio = new Portfolio(new ScrollBarConfig(content));

  portfolio.init();
});
