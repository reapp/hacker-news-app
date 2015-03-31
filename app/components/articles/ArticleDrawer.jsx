import { React, Bar, Drawer, View } from 'reapp-kit';

export default class ArticleDrawer extends React.Component {
  getFrame() {
    return this.refs.frame.getDOMNode();
  }

  iframeBack() {
    if (this.getFrame().history)
      this.getFrame().history.back();
  }

  iframeFwd() {
    if (this.getFrame().history)
      this.getFrame().history.forward();
  }

  iframeRefresh() {
    var frame = this.getFrame();
    frame.src = this.props.url;
  }

  render() {
    var { url } = this.props;

    return (
      <Drawer from="bottom" dragger={false}>
        <View>
          <Bar position="top" display="icon">
            <Bar.Item icon="arrow-left" onTap={this.iframeBack} />
            <Bar.Item icon="arrow-right" onTap={this.iframeFwd} />
            <Bar.Item icon="arrow-refresh" onTap={this.iframeRefresh} />
            <Bar.Item icon="x" onTap={this.props.onClose} />
          </Bar>

          <div styles={this.styles.inner}>
            <iframe ref="frame" style={this.styles.frame} src={url}></iframe>
          </div>
        </View>
      </Drawer>
    );
  }
}

const styles = {
  inner: {
    position: 'absolute',
    display: 'block',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'none'
  },

  frame: {
    position: 'absolute',
    display: 'block',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    border: 'none'
  }
};