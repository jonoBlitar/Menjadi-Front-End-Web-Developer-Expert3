import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';
//import { createLikeButtonTemplate, createLikedButtonTemplate } from '../src/scripts/views/templates/template-creator';
import RestoAkb from '../src/scripts/data/restoakb_idb';


describe('Liking A Resto', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  });

   it('should show the like button when the Resto has not been liked before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.getElementById('likeButtonContainer'),
      resto: { id: 'rqdv5juczeskfw1e867', },
    });

    console.log('Rendered HTML:', document.body.innerHTML);

    const likeButton = document.querySelector('[aria-label="like this resto"]');
    expect(likeButton).toBeTruthy(); // Tombol like harus ada
  }); 

  it('should show the unlike button when the Resto has been liked before', async () => {
    RestoAkb.getResto = jest.fn().mockResolvedValue({ id: 'rqdv5juczeskfw1e867', });
    RestoAkb.putResto = jest.fn().mockResolvedValue(true);
    RestoAkb.deleteResto = jest.fn().mockResolvedValue(true);
    await LikeButtonInitiator.init({
      likeButtonContainer: document.getElementById('likeButtonContainer'),
      resto: { id: 'rqdv5juczeskfw1e867', },
    });

    console.log('Rendered HTML:', document.body.innerHTML);

    const unlikeButton = document.querySelector('[aria-label="unlike this resto"]');
    expect(unlikeButton).toBeTruthy(); // Tombol unlike harus ada
  });
});