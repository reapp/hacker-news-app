var React = require('react');
var Component = require('component');
var Bar = require('reapp-ui/components/Bar');
var BarItem = require('reapp-ui/components/BarItem');
var Drawer = require('reapp-ui/components/Drawer');
var View = require('reapp-ui/views/View');

module.exports = Component({
  styles: {
    viewInner: {
      position: 'absolute',
      display: 'block',
      top: 50,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      border: 'none'
    }
  },

  getFrame() {
    return this.refs.frame.getDOMNode();
  },

  iframeBack() {
    if (this.getFrame().history)
      this.getFrame().history.back();
  },

  iframeFwd() {
    if (this.getFrame().history)
      this.getFrame().history.forward();
  },

  iframeRefresh() {
    var frame = this.getFrame();
    frame.src = this.props.url;
  },

  render() {
    var { url } = this.props;

    return (
      <Drawer from="top">
        <View>
          <Bar position="top" display="icon">
            <BarItem icon="arrow-left" onClick={this.iframeBack} />
            <BarItem icon="arrow-right" onClick={this.iframeFwd} />
            <BarItem icon="arrow-refresh" onClick={this.iframeRefresh} />
            <BarItem icon="x" onClick={this.props.onClose} />
          </Bar>

          <iframe ref="frame" style={this.styles.viewInner} src={url}></iframe>
        </View>
      </Drawer>
    );
  }
});