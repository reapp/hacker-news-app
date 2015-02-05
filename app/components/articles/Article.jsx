var React = require('react');
var Component = require('component');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var TreeNode = require('reapp-ui/helpers/TreeNode');
var View = require('reapp-ui/views/View');
var BackButton = require('reapp-ui/components/buttons/BackButton');
var { ArticlesStore } = require('stores');
var Actions = require('actions');
var RotatingLoadingIcon = require('components/shared/RotatingLoadingIcon');

module.exports = Component({
  mixins: [
    'RouteState',
    'Navigation'
  ],

  statics: {
    fetchData: Actions.articleLoad
  },

  getComments(comments) {
    return comments && comments.map(comment =>
      <TreeNode
        idKey="id"
        childKey="kids"
        cursor={comment}
        Component={Comment}
      />
    ).toArray();
  },

  goBackView() {
    this.props.viewListScrollToStep(0);
  },

  styles: {
    article: {
      self: {
        borderTop: 'none',
        padding: '10px',
        background: 'rgba(0,0,0,0.1)'
      },
      after: {
        display: 'none'
      }
    },

    comments: {
      textWrap: 'nowrap',
      overflow: 'hidden'
    },

    fillWindow: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },

    verticalCenter: {
      margin: 'auto'
    }
  },

  viewStyles(propStyles) {
    var styles = Object.assign({}, propStyles);
    styles.inner = styles.inner || {};
    Object.assign(styles.inner, { padding: 0 } );
    return styles;
  },

  titleBarProps(props) {
    return Object.assign(
      {},
      props,
      { height: 48, transparent: false }
    );
  },

  render() {
    var {
      styles,
      titleBarProps,
      ...props } = this.props;

    var id = Number(this.getParams().id);
    var cursor = ArticlesStore().get(id);
    var article = cursor && cursor.get('data');
    var commentsLoaded = article && article.get('kidsLoaded');

    // todo: not get title from DOM but calc from article.get('kids')
    var title = `Comments (${document.getElementsByClassName('comment').length})`;

    return (
      <View
        id="Article"
        title={[<BackButton onClick={this.goBackView} />, title]}
        titleBarProps={this.titleBarProps(titleBarProps)}
        styles={this.viewStyles(styles)}
        {...props}
      >
        {article &&
          <ArticleItem cursor={cursor} styles={this.styles.article} />
        }

        {!commentsLoaded &&
          <div style={this.styles.fillWindow}>
            <RotatingLoadingIcon styles={{self: this.styles.verticalCenter}} />
          </div>
        }

        {commentsLoaded &&
          <div style={this.styles.comments}>
            {this.getComments(article.get('kids'))}
          </div>
        }
      </View>
    );
  }
});