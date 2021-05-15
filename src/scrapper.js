import axios from 'axios';
import cheerio from 'cheerio';

const sg = 'http://localhost:8080/giveaways/search?page=';

const grabGiveaways = async () => {
  let giveaways = [];
  try {
    let page = 1;
    let flag = true;

    while (flag) {
      console.log(page);
      await axios.get(sg + page)
        .then(response => response.data)
        .then(response => {
          const html = response;
          const $ = cheerio.load(html);
          $(html).find('.giveaway__row-inner-wrap')
            .each((idx, el) => {
              const element = $(el);
              const itemGameEl = element.find('.giveaway__heading__name');
              const itemDates = element.find('[data-timestamp]');
              const itemGameIcon = element.find('.giveaway_image_thumbnail');
              const itemCostAndCopies = element.find('.giveaway__heading__thin');
              const itemAuthor = element.find('.giveaway__username');
              const itemIcon = element.find('.giveaway__icon');
              const itemRestricted = element.find('.giveaway__column--region-restricted');
              const sg = 'https://www.steamgifts.com';

              const item = {
                game: itemGameEl.text(),
                gameIcon: itemGameIcon.css('background-image'),
                cost: itemCostAndCopies.text(),
                copies: '1',
                level: element.find('.giveaway__column--contributor-level').text(),
                entries: element.find('.giveaway__links a span').eq(0).text(),
                remaining: itemDates.eq(0).text(),
                creationDate: itemDates.eq(1).text(),
                giveawayLink: sg + itemGameEl.attr('href'),
                steamLink: itemIcon.attr('href'),
                author: itemAuthor.text(),
                authorLink: sg + itemAuthor.attr('href'),
                restricted: !!itemRestricted.length,
              };

              if (itemCostAndCopies.length === 2) {
                item.copies = itemCostAndCopies.eq(0).text().split(' ')[0];
                item.cost = itemCostAndCopies.eq(1).text();
              } else {
                item.cost = itemCostAndCopies.text();
              }

              if (!item.level.length) {
                item.level = '0';
              }

              giveaways.push(item);
            })

          const nextPage = $('.pagination__navigation .fa-angle-right');
          /* */ 
          if (page) {
            flag = false;
          }
          /* */
          if (!nextPage.length) {
            flag = false;
          }

        })
        .catch(err => {
          console.log(err);
          flag = false;
        });

      // console.log(giveaways.length); //
      page++;
    }

  } catch (error) {
    console.log(error);
  }

  return giveaways; 
}

function removeDuplicates(data) {
  return data = data
    .sort((a, b) => a.giveawayLink > b.giveawayLink ? -1 : 1)
    .reduce((arr, el) => {
      if (!arr.length || arr[arr.length - 1].giveawayLink !== el.giveawayLink) {
        arr.push(el);
      }          
      return arr;
    }, []);
}



function formattingData(data) {
  const types = { second: 1, seconds: 1, minute: 60, minutes: 60,
    hour: 3600, hours: 3600, day: 86400, days: 86400, week: 604800,
    weeks: 604800, month: 18144000, months: 18144000,
  };

  data.forEach(element => {
    const value = element.remaining.split(' ')[0];
    const type = element.remaining.split(' ')[1];

    element.secondsRemaining = value * types[type];

    // element.gameIcon = element.gameIcon.slice(4, -1)
    element.level = element.level.replace(/\D/g, '');
    element.cost = element.cost.slice(1, -2);
    element.entries = element.entries.replace(/\D/g, '');
    element.copies = element.copies.replace(/\D/g, '');
  });

  data = data.sort((a, b) => a.secondsRemaining - b.secondsRemaining)

  return data;
}

export default async () => {
  // const data = await grabGiveaways();
  // return removeDuplicates(data);



  let data = await grabGiveaways();
  data =  removeDuplicates(data);
  data = formattingData(data);
  return data;

}

// init()
