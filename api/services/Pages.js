import { ITEMS_PER_PAGE } from '../config/constants.js';

export default class Pages { 
  static calcPages(total) {
    const amountOfPages = total / ITEMS_PER_PAGE;

    return Number.isInteger(amountOfPages) ? amountOfPages : Math.floor(amountOfPages + 1);
  }
}
