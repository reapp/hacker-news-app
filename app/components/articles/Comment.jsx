var React = require('react/addons');
var Component = require('component');
var Tappable = require('reapp-ui/helpers/Tappable');
var cx = React.addons.classSet;

require('./Comment.styl');

module.exports = Component({
  toggleOpened() {
    this.props.cursor.update('closed', closed => !closed);
  },

  render() {
    var { cursor, level, children } = this.props;

    if (!cursor.get('text'))
      return null;

    var closed = cursor.get('closed');

    var text = !closed &&
      <p dangerouslySetInnerHTML={{__html: cursor.get('text')}} />;

    var classes = {
      [`level-${level}`]: true,
      comment: true
    };

    return (
      <div className={cx(classes)}>
        <div className="comment--content">
          <Tappable
            onTap={this.toggleOpened}
            stopPropagation>
            <h3>{cursor.get('by')}</h3>
            {text}
          </Tappable>
        </div>
        {!closed && children}
      </div>
    );
  }
});