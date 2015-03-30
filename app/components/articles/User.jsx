import {
  React,
  Component,
  View
  } from 'reapp-kit';

export default class User extends Component {
  render() {
    const { cursor } = this.props;
    const user = cursor.get('user') || { get: () => 'Loading' };

    return (
      <View title={user.get('id')}>
        <p dangerouslySetInnerHTML={{__html: user.get('about')}}></p>
        <ul>
          <li>{user.get('karma')}</li>
        </ul>
      </View>
    );
  }
}