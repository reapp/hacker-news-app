import React from 'react';
import Component from 'component';
import View from 'reapp-ui/views/View';
import BackButton from 'reapp-ui/components/buttons/BackButton';
import Store from 'store';
import Actions from 'actions';
import ArticleContent from './ArticleContent';

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