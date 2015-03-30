import {
  React,
  Component,
  Tappable
  } from 'reapp-kit';

import './Comment.styl';

export default class Comment extends Component {
  toggleOpened(e) {
    if (!e.target || e.target.tagName !== 'A')
      this.props.cursor.update('closed', closed => !closed);
  }

  componentDidMount() {
    this.handleLinks();
  }

  componentDidUpdate() {
    this.handleLinks();
  }

  handleLinks() {
    this.refs.content.getDOMNode().addEventListener('click', function(e) {
      if (e.target && e.target.tagName === 'A') {
        e.preventDefault();
        var url = e.target.getAttribute('href');
        window.open(encodeURI(url), '_system');
      }
    });
  }

  render() {
    const { cursor, level, children } = this.props;
    const closed = cursor.get('closed');
    const text = !closed && cursor.get('text');

    return (
      <div className={`level-${level} comment`}>
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
}