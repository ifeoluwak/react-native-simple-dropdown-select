/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DropDownSelect } from 'react-native-simple-dropdown-select';

export default function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<any>(null);

  return (
    <View style={styles.container}>
      <DropDownSelect
        toggle={() => setOpen(!open)}
        selectedData={value}
        open={open}
        data={[
          {
            id: 1,
            name: 'California',
            extraData: ['Apple', 'Banana', 'Orange', 'Mango'],
          },
          {
            id: 2,
            name: 'Texas',
            extraData: ['Tomato', 'Potato', 'Onion', 'Garlic'],
            disabled: true,
          },
          {
            id: 3,
            name: 'Florida',
          },
          {
            id: 4,
            name: 'New York',
            extraData: ['Strawberry', 'Blueberry', 'Raspberry', 'Blackberry'],
          },
          {
            id: 5,
            name: 'Washington',
            extraData: [
              {
                id: 1,
                name: 'Apple',
              },
              {
                id: 2,
                name: 'Banana',
              },
              {
                id: 3,
                name: 'Orange',
              },
              {
                id: 4,
                name: 'Mango',
              },
            ],
          },
          {
            id: 6,
            name: 'Oregon',
            extraData: ['Grapes', 'Cherry', 'Apple', 'Banana', 'Orange'],
          },
          {
            id: 7,
            name: 'Nevada',
            extraData: ['Peach', 'Plum', 'Pear', 'Apricot'],
          },
        ]}
        onSelect={(data) => {
          setValue(data);
          setOpen(false);
        }}
        dropDownContainerStyle={{
          maxHeight: 400,
          minWidth: 300,
        }}
        search
        subViewStyle={{
          backgroundColor: 'pink',
          borderWidth: 1,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
