
import CONFIG from '../../globals/config';

const gambarCard = (resto) => `
    <div tabindex="0" class="card">
          <a href="#/resto/${resto.id}" class="card-a-tag">
          <div class="img-container">
            <img tabindex="0" class="card-image lazyload" alt="${resto.name}" data-src="${CONFIG.BASE_IMAGE_URL + resto.pictureId}"/>
            <span tabindex="0" class="card-city">
              <span>${resto.city}</span>
            </span>
          </div>
          </a>

          <div tabindex="0" class="card-content">
          <p class="card-rating-title">Rating
           <i title="ratings" class="fa fa-star"></i>
           <span>${resto.rating}</span></p>
            <p class="card-content-title">${resto.name}</p>
            <p class="truncate">${resto.description}</p>
          </div>
        </div>
  `;

export default gambarCard;
