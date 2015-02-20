var React = require('react');
var Component = require('component');
var View = require('reapp-ui/views/View');
var BackButton = require('reapp-ui/components/buttons/BackButton');
var { ArticlesStore } = require('stores');
var Actions = require('actions');
var ArticleContent = require('./ArticleContent');

module.exports = Component({
  mixins: [
    'RouteState',
    'Navigation'
  ],

  componentDidMount() {
    this._id = this.getParams().id;

    setTimeout(() => {
      Actions.articleLoad(this._id);
    }, 500);
  },

  componentWillUnmount() {
    Actions.articleUnload(this._id);
  },

  goBackView() {
    this.props.viewListScrollToStep(0);
  },

  render() {
    var { styles, ...props } = this.props;

    var id = Number(this.getParams().id);
    var cursor = ArticlesStore().get(id);

    return (
      <View
        id="Article"
        title={[<BackButton onTap={this.goBackView} />, 'Comments']}
        styles={{ inner: { padding: 0 } }}
        {...props}>
        <ArticleContent cursor={cursor} />
      </View>
    );
  }
});