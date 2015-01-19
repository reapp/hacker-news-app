var React = require('react/addons');
var Component = require('component');

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

    return (
      <div className={React.addons.classSet(classes)} onClick={this.toggleOpened}>
        <div className="comment--content">
          <h3>{cursor.get('by')}</h3>
          <p dangerouslySetInnerHTML={{__html: cursor.get('text')}}></p>
        </div>
        {children}
      </div>
    );
  }
});