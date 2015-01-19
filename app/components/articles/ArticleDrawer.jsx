var React = require('react');
var Component = require('component');
var Bar = require('reapp-ui/components/Bar');
var BarItem = require('reapp-ui/components/BarItem');
var Drawer = require('reapp-ui/components/Drawer');
var View = require('reapp-ui/views/View');

module.exports = Component({
  getInitialState() {
    return {
      isRefreshing: false,
      shownArticle: null
    };
  },

  handleRefresh(e) {
    if (this.state.isRefreshing)
      return;

    this.setState({ isRefreshing: true });

    Actions.articlesHotLoad({ nocache: true }).then(() => {
      this.setState({ isRefreshing: false });
    });
  },

  handleLoadMore(e) {
    e.preventDefault();
    e.target.innerHTML = 'Loading...';

    this.setState({ isRefreshing: true });

    Actions.articlesHotLoadMore().then(() => {
      this.setState({ isRefreshing: false });
    });
  },

  handleArticlePress(id) {
    // todo: make ui alerts and integrate
    Actions.articleSave(id);
  },

  handleArticleClick(article) {
    this.setState({
      shownArticle: article
    });
  },

  render() {
    var { url } = this.props;

    return (
      <Drawer type="top">
        <View>
          <Bar position="top">
            <BarItem icon="arrow-left" />
            <BarItem icon="arrow-right" />
            <BarItem icon="arrow-refresh" />
            <BarItem icon="share" />
            <BarItem icon="x" />
          </Bar>
          <iframe src={url}></iframe>
        </View>
      </Drawer>
    );
  }
});