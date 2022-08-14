import { Subject } from "rxjs";
import { select, selectAll, create } from "./helpers";
import { gsap, Power1 } from "gsap";
import { DATA } from "./data";

export class Portfolio {
  mouseEnterSubject = new Subject();
  mouseOutSubject = new Subject();

  menuList = selectAll(".menu-navigation > li");

  constructor(scrollBarConfig) {
    this.scrollBarConfig = scrollBarConfig;
  }

  init() {
    this._generateList();
    this._initListeners();
  }

  _generateList() {
    const scrollContent = select(".scroll-content");
    const images = create("div");

    gsap.set(images, { className: "images" });

    DATA.forEach((item, i) => {
      const image = create("img");
      gsap.set(image, {
        className: "img-select",
        attr: { src: item.imgUrl, "data-id": item.id },
        zIndex: i + 1,
        height: window.innerHeight / 3,
        filter: "brightness(100%)",
      });

      images.appendChild(image);
    });

    scrollContent.appendChild(images);
  }

  _initListeners() {
    this.menuList.forEach((menu, i) => {
      menu.addEventListener("mouseenter", () => {
        menu.classList.add("active");
        this.mouseEnterSubject.next({ menu, index: i });
      });
      menu.addEventListener("mouseout", () => {
        menu.classList.remove("active");
        this.mouseOutSubject.next();
      });
    });

    this._listenHover();
    this._listenMouseOut();
  }

  _listenHover() {
    this.mouseEnterSubject.asObservable().subscribe({
      next: ({ _, index }) => {
        const images = selectAll(".img-select");

        images.forEach((image, i) => {
          if (i === index) {
            gsap.to(image, {
              filter: "brightness(100%)",
              duration: 0.8,
            });
          } else {
            gsap.to(image, {
              filter: "brightness(30%)",
              duration: 0.8,
            });
          }
        });

        this._scrollToSelectedImage(images[index]);

        this.menuList.forEach((menu, i) => {
          if (i === index) {
            gsap.to(menu, {
              scale: 7,
              translateX: -5,
              transformOrigin: "left",
              duration: 0.8,
              ease: Power1.easeInOut,
            });
          }

          gsap.to(menu, {
            translateY: -10 * (index - i),
            transformOrigin: "left",
            duration: 0.8,
            ease: Power1.easeInOut,
          });
        });
      },
    });
  }

  _scrollToSelectedImage(selectedImage) {
    const { top } = selectedImage.getBoundingClientRect();

    const { scrollBarInstance } = this.scrollBarConfig;

    scrollBarInstance.scrollTo(0, top + scrollBarInstance.offset.y, 1000, {
      easing: Power1.easeInOut,
    });
  }

  _listenMouseOut() {
    this.mouseOutSubject.asObservable().subscribe({
      next: () => {
        const images = selectAll(".img-select");

        this.menuList.forEach((menu) => {
          gsap.to(menu, {
            translateY: 0,
            translateX: 0,
            scale: 1,
            duration: 0.8,
            ease: Power1.easeInOut,
          });
        });
        images.forEach((image) => {
          gsap.to(image, {
            filter: "brightness(100%)",
            duration: 0.8,
            ease: Power1.easeInOut,
          });
        });
      },
    });
  }
}
