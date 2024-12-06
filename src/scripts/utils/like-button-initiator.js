import RestoAkb from '../data/restoakb_idb';
import {
  createLikeButtonTemplate,
  createLikedButtonTemplate,
} from '../views/templates/template-creator';
import { initSwalError, initSwalSuccess } from './swal-initiator';

const LikeButtonInitiator = {
  async init({ likeButtonContainer, resto }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = resto.restaurant;
    console.log('Restaurant Object:', this._restaurant);
    await this._renderButton();
  },

  async _renderButton() {
    //try {
      const { id } = this._restaurant;
      console.log('Resto:', id);
      const restaurant = await RestoAkb.getResto(id);
      console.log('Restaurant indexDb:', restaurant);
      // get resto in indexed db
      if (restaurant) {
        this._renderLikedButtonTemplate();
      } else {
        this._renderLikeButtonTemplate();
      }
    /* } catch (err) {
      console.error(err);
      initSwalError(err.message);

      throw new Error(err);
    } */
  },
  /*  async _isRestoranAda(id) {
    const restaurant = await RestoAkb.getResto(id);
    return !!restaurant;
  }, */

  _renderLikeButtonTemplate() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate(); // append html

    const likeButton = document.querySelector('#likeButton');

    likeButton.addEventListener('click', async () => {
      // onClick fav the selected resto
      await RestoAkb.putResto(this._restaurant);
      initSwalSuccess('Resto favorited!');
      this._renderButton();
    });
  },

  _renderLikedButtonTemplate() {
    this._likeButtonContainer.innerHTML = createLikedButtonTemplate(); // append html

    const likeButton = document.querySelector('#likeButton');

    likeButton.addEventListener('click', async () => {
      // onClick unfav the selected resto
      await RestoAkb.deleteResto(this._restaurant.id);
      initSwalSuccess('Resto unfavorited!');
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
