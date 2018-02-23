import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabView from 'react-native-scrollable-tab-view';
import Bitcoin from './Bitcoin';
import Ethereum from './Ethereum';
import LiteCoin from './LiteCoin';

const styles = StyleSheet.create({
  underlineStyle: {
    backgroundColor: 'white',
  },
  tab: {
    marginTop: 0,
    height: 0,
  },
  tabLabel: {
    textDecorationLine: 'underline',
  },
});

const Tab = props => (
  <TabView
    style={styles.tab}
    tabBarPosition="overlayTop"
    tabBarBackgroundColor="#ad5389"
    tabBarActiveTextColor="white"
    tabBarInactiveTextColor="white"
    tabBarUnderlineStyle={styles.underlineStyle}
  >
    <Bitcoin tabLabel="BITCOIN" style={styles.tabLabel} />
    <Ethereum tabLabel="ETHEREUM" style={styles.tabLabel} />
    <LiteCoin tabLabel="LITECOIN" style={styles.tabLabel} />
  </TabView>
);

export default Tab;
