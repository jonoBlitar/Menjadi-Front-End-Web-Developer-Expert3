import RestoAkb from '../../data/restoakb_idb';
import restoCard from '../templates/gambarCard';

const Favorite = {
  async render() {
    return `
     <div class="content">
        <h2 class="content__heading">Resto AKB You Liked</h2>
        <div id="movies" class="movies">

        </div>
      </div>
    `;
  },

  async afterRender() {
    // get fav resto
    const data = await RestoAkb.getAllResto();
    const favRestoContainer = document.querySelector('#movies');
    console.log(data);
    // if data empty
    if (data.length === 0) {
      favRestoContainer.innerHTML = `Empty favorite Resto. Put one, by clicking heart button in the detail page.`;
    }
    // display all fav resto
    data.forEach((resto) => {
      favRestoContainer.innerHTML += restoCard(resto);
    });
  },
};

export default Favorite;
