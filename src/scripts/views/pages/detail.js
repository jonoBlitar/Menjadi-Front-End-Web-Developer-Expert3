import RestoranSource from '../../data/data-resto-source';
import DetailResto from '../templates/restoDetil';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import { initSwalError } from '../../utils/swal-initiator';
import PostReview from '../../utils/review';
import Indikator from '../templates/indikator';

const Detail = {
  async render() {
    return `
        <div class="container">
       <div id="loading"></div>
          <div class="like" id="likeButtonContainer"></div>  
          <div id="main-container">
            <h2 class="title-container">Resto Detail</h2>
  
            <section id="detail-resto"></section>
  
            <div class="form-review">
              <form autocomplete="on">
                <div class="mb-3">
                  <label for="name-input" class="form-label">Name</label>
                  <input type="text" class="form-control" id="name-input" minlength="3" placeholder="Your name..." required>
                </div>
  
                <div class="mb-3">
                  <label for="review-input" class="form-label">Review</label>
                  <input type="text" class="form-control" id="review-input" minlength="3" placeholder="Your review..." required>
                </div>
  
                <button id="submit-review" type="submit" class="form-label">Submit Review</button>
              </form>
            </div>
          </div>
        </div>
      `;
  },

  // Fungsi ini akan dipanggil setelah render()
  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    const indikator = document.querySelector('#loading');
    const mainContainer = document.querySelector('#main-container');
    const detailContainer = document.querySelector('#detail-resto');

    // change main display to spinner
    mainContainer.style.display = 'none';
    indikator.innerHTML = Indikator();

    try {
      const resto = await RestoranSource.getRestaurantDetail(url.id);

      // use the detail data
      console.info(resto.restaurant);
      detailContainer.innerHTML += DetailResto(resto.restaurant);

      // init like button
      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        resto,
      });
      mainContainer.style.display = 'block';
      indikator.style.display = 'none';
      // review form
      const btnSubmitReview = document.querySelector('#submit-review');
      const nameInput = document.querySelector('#name-input');
      const reviewInput = document.querySelector('#review-input');

      btnSubmitReview.addEventListener('click', async (e) => {
        e.preventDefault();

        // POST review
        await PostReview(url, nameInput.value, reviewInput.value);

        // clear form input
        nameInput.value = '';
        reviewInput.value = '';
      });
    } catch (err) {
      console.error(err);

      mainContainer.style.display = 'block';
      //loading.style.display = 'none';
      detailContainer.innerHTML = `Error: ${err.message}`;
      initSwalError(err.message);
    }
  },
};

export default Detail;