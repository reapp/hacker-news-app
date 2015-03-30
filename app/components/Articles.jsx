import {
  React,
  Reapp,
  View,
  List,
  Theme } from 'reapp-kit';

import Actions from 'actions';
import Store from 'store';
import RefreshButton from './articles/RefreshButton';
import ArticleItem from './articles/ArticleItem';
import RotatingLoadingIcon from 'components/shared/RotatingLoadingIcon';
import theme from 'theme/theme';

export default class Articles extends Reapp {
  componentWillMount() {
    Actions.articlesHotLoad();
  }

  getInitialState() {
    return {
      isRefreshing: false
    };
  }

  handleRefresh(e) {
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
    const articles = Store().get('hotArticles');
    return (
      <Reapp theme={theme} store={Store()}>
        <View>
          <TitleBar right={
            <RefreshButton
              onTap={this.handleRefresh.bind(this)}
              rotate={this.state.isRefreshing}
            />
          }>
            Hot Articles
          </TitleBar>

          {!articles &&
            <div style={{ padding: 20, marginLeft: -10 }}>
              <RotatingLoadingIcon />
            </div>
          }

          {articles &&
          <List>
            {articles.map((article, i) =>
              <ArticleItem key={i} index={i} article={article} />
            )}

            <List.Item
              styles={styles.loadMore}
              onTap={this.handleLoadMore.bind(this)}>
              Load More
            </List.Item>
          </List>
        </View>

        {this.childRouteHandler({
          articles: Store().get('articles')
        })}
      </Reapp>
    );
  }
};

const styles = {
  loadMore: {
    content: {
      textAlign: 'center',
      padding: 20
    }
  }
};