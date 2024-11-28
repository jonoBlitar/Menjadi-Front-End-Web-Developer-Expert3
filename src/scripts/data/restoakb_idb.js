import { openDB } from 'idb';
import CONFIG from '../globals/config';

const { DB_NAME, DB_VERSION, OBJECT_STORE_NAME } = CONFIG;

const openIdb = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    db.createObjectStore(OBJECT_STORE_NAME, {
      keyPath: 'id',
      autoIncrement: true, // Set ke false jika Anda menggunakan custom ID.
    });
  },
});

const RestoAkb = {
  // get one resto
  async getResto(id) {
    return (await openIdb).get(OBJECT_STORE_NAME, id);
  },

  // get all resto
  async getAllResto() {
    return (await openIdb).getAll(OBJECT_STORE_NAME);
  },

  // put resto
  async putResto(resto) {
    return (await openIdb).put(OBJECT_STORE_NAME, resto);
  },

  // delete resto
  async deleteResto(id) {
    return (await openIdb).delete(OBJECT_STORE_NAME, id);
  },
};

export default RestoAkb;
