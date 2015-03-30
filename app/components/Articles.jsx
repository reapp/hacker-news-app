import {
  React,
  Reapp,
  Component,
  View,
  NestedViewList,
  List } from 'reapp-kit';

import actions from 'actions';
import store from 'store';
import theme from 'theme';
const context = { theme, store, actions };

import RefreshButton from './articles/RefreshButton';
import ArticleItem from './articles/ArticleItem';
import RotatingLoadingIcon from './shared/RotatingLoadingIcon';

actions.articlesHotLoad();

export default Reapp(context, class extends Component {
  constructor() {
    this.state = {
      refreshing: false
    };
  }

  handleRefresh() {
    if (this.state.refreshing) return;
    this.setState({ refreshing: true });
    Actions.articlesHotRefresh().then(() => {
      this.setState({ refreshing: false });
    });
  }

  handleLoadMore(e) {
    e.target.innerHTML = 'Loading...';
    this.setState({ refreshing: true });
    Actions.articlesHotLoadMore().then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    const articles = store().get('hotArticles');
    const id = this.router.getCurrentParams().id;
    let article;

    if (id)
      article = store().getIn(['articles', Number(id)]);

    const refresh =
      <RefreshButton
        onTap={this.handleRefresh.bind(this)}
        rotate={this.state.refreshing}
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

        {this.props.child && this.props.child({ article })}
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