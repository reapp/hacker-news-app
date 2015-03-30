var React = require('react');
var Component = require('component');
var View = require('reapp-ui/views/View');
var BackButton = require('reapp-ui/components/buttons/BackButton');
var Store = require('store');
var Actions = require('actions');
var ArticleContent = require('./ArticleContent');

export default Component({
  componentDidMount() {
    this._id = this.context.router.getCurrentParams().id;

    setTimeout(() => {
      Actions.articleLoad(this._id);
    }, 450);
  },

  componentWillUnmount() {
    Actions.articleUnload(this._id);
  },

  goBackView() {
    this.props.viewListScrollToStep(0);
  },

  render() {
    var { articles, ...props } = this.props;

    var id = Number(this.context.router.getCurrentParams().id);
    var article = articles.getIn([id, 'data']);

    return (
      <View {...props}
        title={[<BackButton onTap={this.goBackView} />, 'Comments']}
        styles={styles.view}>
        <ArticleContent article={article} />
      </View>
    );
  }
});

const styles = {
  view: {
    inner: {
      padding: 0
    }
  }
};