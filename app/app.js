import Reapp, { router, route } from 'reapp-kit';

export default router(require,
  route('articles', '/',
    route('article', '/article/:id'),
    route('user', '/user/:id')
  )
)