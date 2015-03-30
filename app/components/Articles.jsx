import {
  React,
  Reapp,
  Routed,
  View,
  NestedViewList,
  List } from 'reapp-kit';

import actions from 'actions';
import store from 'store';
import theme from 'theme';

import RefreshButton from './articles/RefreshButton';
import ArticleItem from './articles/ArticleItem';
import RotatingLoadingIcon from './shared/RotatingLoadingIcon';

export default Reapp({ theme, store, actions }, class extends React.Component {
  constructor(props) {
    store.listen(() => this.forceUpdate(), this);
    this.state = {
      isRefreshing: false
    };
  }

  componentWillMount() {
    actions.articlesHotLoad();
  }

  handleRefresh() {
    if (!this.state.isRefreshing) {
      this.setState({ isRefreshing: true });
      Actions.articlesHotRefresh().then(() => {
        this.setState({ isRefreshing: false });
      });
    }
  }

  handleLoadMore(e) {
    e.target.innerHTML = 'Loading...';
    this.setState({ isRefreshing: true });
    Actions.articlesHotLoadMore().then(() => {
      this.setState({ isRefreshing: false });
    });
  }

  render() {
    const articles = store().get('hotArticles');
    const refresh =
      <RefreshButton
        onTap={this.handleRefresh.bind(this)}
        rotate={this.state.isRefreshing}
      />

    return (
      <NestedViewList {...this.props.viewListProps}>
        <View title="Hot Articles" titleRight={refresh}>
          {!articles &&
            <div style={{ padding: 20, marginLeft: -10 }}>
              <RotatingLoadingIcon />
            </div>
          }

          {articles &&
            <List>
              {articles.map((article, i) =>
                <ArticleItem key={i} index={i}
                  article={store().getIn(['articles', article, 'data'])} />
              )}

              <List.Item
                styles={styles.loadMore}
                onTap={this.handleLoadMore.bind(this)}>
                Load More
              </List.Item>
            </List>
          }
        </View>

        {this.props.child && this.props.child({
          articles: store().get('articles')
        })}
      </NestedViewList>
    );
  }
});

const styles = {
  loadMore: {
    content: {
      textAlign: 'center',
      padding: 20
    }
  }
};