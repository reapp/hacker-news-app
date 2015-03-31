import {
  React,
  Tappable
  } from 'reapp-kit';

import './Comment.styl';

export default class Comment extends React.Component {
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
    const s = styles;

    return (
      <div styles={[s.div, s.comment, s.level[level]]}>
        <div styles={[s.div, s.content]} ref="content">
          <Tappable
            tapFocusStyle={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
            maxTapTime={900}
            onTap={this.toggleOpened.bind(this)}
            styles={s.tappable}>

            <h3 styles={s.title}>{cursor.get('by')}</h3>

            {!closed && text &&
              <div styles={s.div}>
                <p styles={s.text} dangerouslySetInnerHTML={{__html: text}} />
              </div>
            }
          </Tappable>
        </div>
        {!closed && children}
      </div>
    );
  }
}

const styles = {
  comment: {
    display: 'block',
    lineHeight: '18px',
    borderLeft: '10px solid #ecedde'
  },

  level: {
    5: { borderColor: '#e2e3d2' },
    4: { borderColor: '#dbddcc' },
    3: { borderColor: '#d5d7c6' },
    2: { borderColor: '#cfd1c1' },
    1: { borderColor: '#c9cbbb' }
  },

  div: {
    display: 'block',
  },

  content: {
    borderBottom: '1px solid #e2e3d2',
  },

  tappable: {
    self: {
      padding: '8px 20px'
    }
  },

  title: {
    fontSize: '15px',
    margin: '4px 0'
  },

  text: {
    fontSize: '14px',
    lineHeight: '1.3rem',
    margin: '0 0 10px 0',
    wordWrap: 'break-word'
  },

  closed: {
    display: 'none',
  }
}