import Component from 'component';
import View from 'reapp-ui/views/View';

export default Component({
  render() {
    var { cursor } = this.props;
    var user = cursor.get('user') || { get: () => 'Loading' };

    return (
      <View title={user.get('id')}>
        <p dangerouslySetInnerHTML={{__html: user.get('about')}}></p>
        <ul>
          <li>{user.get('karma')}</li>
        </ul>
      </View>
    );
  }
});