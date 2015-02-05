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

    var classes = {
      [`level-${level}`]: true,
      comment: true,
      closed: cursor.get('closed')
    };

    if (!cursor.get('text'))
      return null;

    return (
      <div className={cx(classes)}>
        <div className="comment--content">
          <Tappable onTap={this.toggleOpened} stopPropagation>
            <h3>{cursor.get('by')}</h3>
            <p dangerouslySetInnerHTML={{__html: cursor.get('text')}}>
            </p>
          </Tappable>
        </div>
        {children}
      </div>
    );
  }
});