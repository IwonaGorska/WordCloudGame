import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { injectMocks } from 'data-mocks';
import { Scenarios } from 'data-mocks/dist/types';

const scenarios: Scenarios = {
  default: [
    {
      url: /words/,
      method: 'GET',
      response: {
        "0": {
          "question": "select animals",
          "all_words": [
            "hole",
            "sofa",
            "pear",
            "tiger",
            "oatmeal",
            "square",
            "nut",
            "cub",
            "shirt",
            "tub",
            "passenger",
            "cow"
          ],
          "good_words": [
            "tiger",
            "cow"
          ]
        },
        "1": {
          "question": "select colors",
          "all_words": [
            "jeans",
            "existence",
            "ink",
            "red",
            "blue",
            "yellow",
            "laugh",
            "behavior",
            "expansion",
            "white",
            "black",
            "cakes"
          ],
          "good_words": [
            "red",
            "blue",
            "yellow",
            "white",
            "black"
          ]
        },
        "2": {
          "question": "select vehicles",
          "all_words": [
            "belief",
            "wire",
            "car",
            "bus",
            "star",
            "river",
            "hat",
            "skirt",
            "train"
          ],
          "good_words": [
            "car",
            "bus",
            "train"
          ]
        }
      },
      responseCode: 200
    }
  ]
};

injectMocks(scenarios, 'default', {allowXHRPassthrough: true, allowFetchPassthrough: true});

@Injectable({
  providedIn: 'root'
})
export class WordsServiceService {

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get('https://foo.d/words');
  }
}
