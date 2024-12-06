
const assert = require('assert');
Feature('Liking Resto');

Before(({ I }) => {
  I.amOnPage('/#/favorit');
  /*  I.executeScript(() => {
    localStorage.clear(); // Hapus semua data favorit
  }); */

});
const firstCondition ='Empty favorite Resto. Put one, by clicking heart button in the detail page.';

Scenario('showing empty favorite restaurant', ({ I }) => {
  //I.amOnPage('/#/favorit');
  //I.waitForElement('#movies', 5); // Tunggu elemen tersedia
  I.seeElement('#movies'); // Periksa apakah elemen terlihat
  I.see(firstCondition, '#movies'); // Periksa teks yang diharapkan
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see(firstCondition, '#movies');
  I.amOnPage('/');
  I.seeElement('.card a');
  const firstCard = locate('.card-content-title').first();
  const firstCardTitle = await I.grabTextFrom(firstCard);
  I.click('.card-image');
  I.waitForElement('#likeButton', 5); // Tunggu tombol like muncul

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorit');
  I.seeElement('.card');
  const likedCardTitle = await I.grabTextFrom('.card-content-title');

  assert.strictEqual(firstCardTitle, likedCardTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see(firstCondition, '#movies');
  I.amOnPage('/');
  I.seeElement('.card a');
  const firstCard = locate('.card-content-title').first();
  const firstCardTitle = await I.grabTextFrom(firstCard);
  I.click('.card-image');
  I.waitForElement('#likeButton', 5); // Tunggu tombol like muncul

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorit');


  I.seeElement('.card');
  const likedCardTitle = await I.grabTextFrom('.card-content-title');
  console.log(`Title of liked restaurant: ${likedCardTitle}`);
  I.click('.card-image');

  // URL: /resto/:id
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // URL: /#/favorit
  I.amOnPage('/#/favorit');
  I.seeElement('#movies');
  I.dontSeeElement('.card');
  I.dontSeeElement('.card-content-title');
});


