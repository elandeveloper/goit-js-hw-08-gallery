const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const galleryEl = document.querySelector(".js-gallery");
const modalEl = document.querySelector(".js-lightbox");
const lightBoxImgEl = document.querySelector(".lightbox__image");
const lightboxCloseButtonEl = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const lightBoxOverlayEl = document.querySelector(".lightbox__overlay");

const galleryMarkup = createGalleryItemsMarkup(galleryItems);

galleryEl.insertAdjacentHTML("afterbegin", galleryMarkup);
galleryEl.addEventListener("click", getOriginalImage);
lightboxCloseButtonEl.addEventListener("click", closeModal);
lightBoxOverlayEl.addEventListener("click", onOverlayClick);

function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
    })
    .join("");
}

function getOriginalImage(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const originalImageScr = evt.target.dataset.source;
  const originalImageAlt = evt.target.alt;
  const originalImage = evt.target;

  openModal(originalImageScr, originalImageAlt, originalImage);
}

const arrOfImages = [...galleryEl.querySelectorAll(".gallery__image")];

function openModal(source, alt, image) {
  document.addEventListener("keydown", onEskPress);
  document.addEventListener("keydown", onImageChangeByKey);

  modalEl.classList.add("is-open");

  lightBoxImgEl.src = source;
  lightBoxImgEl.alt = alt;
  lightBoxImgEl.dataset.index = arrOfImages.indexOf(image);
}

function closeModal() {
  document.removeEventListener("keydown", onEskPress);
  document.removeEventListener("keydown", onImageChangeByKey);

  modalEl.classList.remove("is-open");

  lightBoxImgEl.src = "";
  lightBoxImgEl.alt = "";
  lightBoxImgEl.removeAttribute("data-index");
}

function onOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal();
  }
}

function onEskPress(evt) {
  if (evt.code === "Escape") {
    closeModal();
  }
}

function onImageChangeByKey(evt) {
  if (evt.code === "ArrowLeft") {
    lightboxImageMove(-1);
  }

  if (evt.code === "ArrowRight") {
    lightboxImageMove(1);
  }
}

function lightboxImageMove(step) {
  const currentIndex = Number(lightBoxImgEl.dataset.index);
  let afterStepIndex = currentIndex + step;

  if (afterStepIndex < 0) {
    afterStepIndex = arrOfImages.length - 1;
  }

  if (afterStepIndex > arrOfImages.length - 1) {
    afterStepIndex = 0;
  }

  lightBoxImgEl.src = arrOfImages[afterStepIndex].dataset.source;
  lightBoxImgEl.alt = arrOfImages[afterStepIndex].alt;
  lightBoxImgEl.dataset.index = afterStepIndex;
}
