import { View, Text, StyleSheet } from 'react-native';

export default function ProfileTab() {
  /* need backend for this? or just localStorage to only track highscore until person deletes their localStorage? */

  return (
    <View style={styles.container}>
      <Text>Tab [Home|Game|Profile]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});