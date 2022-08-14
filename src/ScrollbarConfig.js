import Scrollbar from "smooth-scrollbar";
import { ModalPlugin } from "./plugins/scroll-disable";

export class ScrollBarConfig {
  content = null;

  _scrollBarInstance = null;
  get scrollBarInstance() {
    return this._scrollBarInstance;
  }
  set scrollBarInstance(instance) {
    this._scrollBarInstance = instance;
  }

  constructor(content) {
    this.content = content;

    this.init();
  }

  init() {
    Scrollbar.use(ModalPlugin);
    this.scrollBarInstance = Scrollbar.init(this.content, {
      damping: 0.03,
      delegateTo: document,
    });

    this.scrollBarInstance.setPosition(0, 0);
    this.scrollBarInstance.track.yAxis.element.remove();
    this.scrollBarInstance.track.xAxis.element.remove();
    this.scrollBarInstance.updatePluginOptions("modal", { open: true });
  }
}
