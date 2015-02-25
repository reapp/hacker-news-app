var React = require('react');
var Component = require('component');
var View = require('reapp-ui/views/View');
var BackButton = require('reapp-ui/components/buttons/BackButton');
var { ArticlesStore } = require('stores');
var Actions = require('actions');
var ArticleContent = require('./ArticleContent');

module.exports = Component({
  mixins: [
    'RouteState'
  ],

  componentDidMount() {
    this._id = this.getParams().id;

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
    var { styles, ...props } = this.props;

    var id = Number(this.getParams().id);
    var cursor = ArticlesStore().get(id);

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