import { createCursorStore } from 'fynx';
import Immutable from 'immutable';

export default createCursorStore(
  Immutable.fromJS({
    articles: {},
    hotArticles: [],
    users: [],
    savedArticles: []
  })
);