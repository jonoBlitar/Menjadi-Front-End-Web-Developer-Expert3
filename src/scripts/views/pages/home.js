import RestoranSource from '../../data/data-resto-source';
import gambarCard from '../templates/gambarCard';
import Indikator from '../templates/indikator';
const Home = {
  async render() {
    return `
       <div class="container">
        <div id="loading"></div>

        <div id="main-container">
          <h1 tabindex="0" class="main-content__title">AKB Resto</h1>
          <section id="cari-resto"></section>
        </div>
      </div>
    
      `;
  },

  async afterRender() {
    // Fungsi ini akan dipanggil setelah render()
    const restorans = await RestoranSource.getRestaurantList();
    const mainContainer = document.querySelector('#main-container');
    const moviesContainer = document.querySelector('#cari-resto');
    const indikator = document.querySelector('#loading');
    console.log(restorans);
    mainContainer.style.display='none';
    indikator.innerHTML = Indikator();
    try {
      restorans.restaurants.forEach((restaurant) => {
        moviesContainer.innerHTML += gambarCard(restaurant);
      });
      mainContainer.style.display = 'block';
      indikator.style.display='none';
    } catch (err){
      console.error(err);

      mainContainer.style.display = 'block';
    }
  },
};

export default Home;