var React = require('react/addons');
var Component = require('component');
var Tappable = require('reapp-ui/helpers/Tappable');
var cx = React.addons.classSet;

function isSelecting() {
  // if (window.getSelection) {
  //   if (window.getSelection().empty) {  // Chrome
  //     window.getSelection().empty();
  //   } else if (window.getSelection().removeAllRanges) {  // Firefox
  //     window.getSelection().removeAllRanges();
  //   }
  // } else if (document.selection) {  // IE?
  //   document.selection.empty();
  // }
}

require('./Comment.styl');

module.exports = Component({
  toggleOpened(e) {
    if (!e.target || e.target.tagName !== 'A')
      this.props.cursor.update('closed', closed => !closed);
  },

  componentDidMount() {
    this.handleLinks();
  },

  componentDidUpdate() {
    this.handleLinks();
  },

  handleLinks() {
    this.refs.content.getDOMNode().addEventListener('click', function(e) {
      clearSelection();

      if (e.target && e.target.tagName === 'A') {
        e.preventDefault();
        var url = e.target.getAttribute('href');
        window.open(encodeURI(url), '_system');
      }
    });
  },

  render() {
    var { cursor, level, children } = this.props;
    var closed = cursor.get('closed');
    var text;

    if (!closed)
      text = cursor.get('text');

    var classes = {
      [`level-${level}`]: true,
      comment: true
    };

    return (
      <div className={cx(classes)}>
        <div className="comment--content" ref="content">
          <Tappable
            tapFocusStyle={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
            maxTapTime={900}
            onTap={this.toggleOpened}
            styles={{ self: { padding: '8px 20px' } }}>

            <h3>{cursor.get('by')}</h3>

            {!closed && text &&
              <div>
                <p dangerouslySetInnerHTML={{__html: text}} />
              </div>
            }
          </Tappable>
        </div>
        {!closed && children}
      </div>
    );
  }
});