var React = require('react');
var Component = require('component');
var Bar = require('reapp-ui/components/Bar');
var BarItem = require('reapp-ui/components/BarItem');
var Drawer = require('reapp-ui/components/Drawer');
var View = require('reapp-ui/views/View');

module.exports = Component({
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