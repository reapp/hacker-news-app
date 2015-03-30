import React from 'react';
import Component from 'component';
import NestedViewList from 'reapp-ui/views/NestedViewList';
import Actions from 'actions';
import Store from 'store';
import { storeRefreshMixin } from 'reapp-platform';
import { RoutedViewListMixin } from 'reapp-routes/react-router';
import View from 'reapp-ui/views/View';
import RefreshButton from './articles/RefreshButton';
import ArticlesContent from './ArticlesContent';
import Theme from 'reapp-ui/helpers/Theme';
import theme from 'theme/theme';

export default Component({
  statics: {
    fetchData: Actions.articlesHotLoad
  },

  mixins: [
    RoutedViewListMixin,
    storeRefreshMixin(Store)
  ],

  getInitialState() {
    return {
      isRefreshing: false
    };
  },

  handleRefresh(e) {
    if (!this.state.isRefreshing) {
      this.setState({ isRefreshing: true });
      Actions.articlesHotRefresh().then(() => {
        this.setState({ isRefreshing: false });
      });
    }
  },

  handleLoadMore(e) {
    e.preventDefault();
    e.target.innerHTML = 'Loading...';

    this.setState({ isRefreshing: true });
    Actions.articlesHotLoadMore().then(() => {
      this.setState({ isRefreshing: false });
    });
  },

  render() {
    const articles = Store().get('articles');
    const hotArticles = Store().get('hotArticles');

    var refreshButton =
      <RefreshButton
        onTap={this.handleRefresh}
        rotate={this.state.isRefreshing}
      />

    return (
      <Theme {...theme}>
        <NestedViewList {...this.routedViewListProps()}>
          <View title={[, 'Hot Articles', refreshButton]}>
            <ArticlesContent
              articles={hotArticles}
              onLoadMore={this.handleLoadMore}
            />
          </View>

          {this.childRouteHandler({ articles })}
        </NestedViewList>
      </Theme>
    );
  }
});