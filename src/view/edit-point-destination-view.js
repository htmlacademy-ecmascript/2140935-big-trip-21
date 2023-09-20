import AbstractView from '../framework/view/abstract-view.js';

function createImageTemplate(pictures) {
  let imageTemplate = '';
  if (pictures) {
    for (const picture of pictures) {
      imageTemplate +=
      `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
    }
  }
  return imageTemplate;
}

function createEditPointDestinationTemplate(destination) {
  const imageTemplate = createImageTemplate(destination.pictures);

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${imageTemplate}
        </div>
      </div>
    </section>`
  );
}

export default class EditPointDestinationView extends AbstractView {
  #destination = null;

  constructor({ destination }) {
    super();
    this.#destination = destination;
  }

  get template() {
    return createEditPointDestinationTemplate(this.#destination);
  }

}
