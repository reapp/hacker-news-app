import React from 'react';
import Component from 'component';
import ArticleItem from './articles/ArticleItem';
import RotatingLoadingIcon from 'components/shared/RotatingLoadingIcon';
import List from 'reapp-ui/components/List';

export default Component({
  listStyle: {
    self: {
      borderTop: 'none'
    }
  },

  render() {
    const { articles } = this.props;

    return (
      <List styles={this.listStyle}>
        {articles && articles.map((article, i) =>
          <ArticleItem
            key={i}
            index={i}
            onClickComments={this.handleClickComments}
            cursor={article}
          />
        )}

        {articles &&
          <List.Item
            key={1000}
            styles={{
              content: {
                textAlign: 'center',
                padding: 20
              }
            }}
            onTap={this.props.onLoadMore}>
            Load More
          </List.Item>
        }

        {!articles && !this.props.inactive &&
          <div style={{ padding: 20, marginLeft: -10 }}>
            <RotatingLoadingIcon />
          </div>
        }
      </List>
    )
  }
})