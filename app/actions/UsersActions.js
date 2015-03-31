import { actions, store } from 'reapp-kit';

actions('userLoad', id => {
  fetch(`https://hacker-news.firebaseio.com/v0/user/${id}.json`).then(res => {
    store().set('users', res);
  });
});