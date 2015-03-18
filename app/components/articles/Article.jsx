var React = require('react');
var Component = require('component');
var View = require('reapp-ui/views/View');
var BackButton = require('reapp-ui/components/buttons/BackButton');
var Store = require('store');
var Actions = require('actions');
var ArticleContent = require('./ArticleContent');

module.exports = Component({
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

  styles: {
    view: {
      inner: {
        padding: 0
      }
    }
  },

  render() {
    var { styles, articlesStore, ...props } = this.props;

    var id = Number(this.context.router.getCurrentParams().id);
    var cursor = articlesStore.get(id);

    return (
      <View
        title={[<BackButton onTap={this.goBackView} />, 'Comments']}
        styles={this.styles.view}
        {...props}>
        <ArticleContent cursor={cursor} />
      </View>
    );
  }
});