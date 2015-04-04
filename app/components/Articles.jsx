import { React, Reapp, View, NestedViewList, List } from 'reapp-kit';

import RefreshButton from './shared/RefreshButton';
import ArticleItem from './articles/ArticleItem';
import RotatingLoadingIcon from './shared/RotatingLoadingIcon';

export default Reapp(class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    };
  }

  componentWillMount() {
    this.action.articlesHotLoad();
  }

  handleRefresh() {
    if (this.state.refreshing) return;
    this.setState({ refreshing: true });
    this.action.articlesHotRefresh().then(() => {
      this.setState({ refreshing: false });
    });
  }

  handleLoadMore(e) {
    e.target.innerHTML = 'Loading...';
    this.setState({ refreshing: true });
    this.action.articlesHotLoadMore().then(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    const store = this.context.store();
    const articles = store.get('hotArticles');
    const id = this.context.router.getCurrentParams().id;
    const article = id && store.getIn(['articles', Number(id)]);
    const Child = this.props.child;

    return (
      <NestedViewList {...this.props.viewListProps}>
        <View title="Hot Articles" titleRight={
          <RefreshButton
            onTap={this.handleRefresh.bind(this)}
            rotate={this.state.refreshing}
          />
        }>
          {!articles &&
            <div style={styles.iconContainer}>
              <RotatingLoadingIcon />
            </div>
          }

          {articles &&
            <List>
              {articles.map((article, i) =>
                <ArticleItem key={i} index={i}
                  article={store.getIn(['articles', article, 'data'])} />
              )}

              <List.Item
                styles={styles.loadMore}
                onTap={this.handleLoadMore.bind(this)}>
                Load More
              </List.Item>
            </List>
          }
        </View>

        {Child &&
          Child({ article: article })
        }
      </NestedViewList>
    );
  }
});

const styles = {
  iconContainer: {
    padding: 20,
    marginLeft: -10
  },

  loadMore: {
    content: {
      textAlign: 'center',
      padding: 20
    }
  }
};