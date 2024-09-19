/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Text,
} from 'react-native';
import { DropDownFlatlist } from './DropDownFlatlist';
import { colors } from '../colors';
import type { DropDownProps } from '../types';

const DropDownSelect = (props: DropDownProps) => {
  const [query, setQuery] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [y, setY] = React.useState(0);

  const data = useMemo(() => {
    if (!query) {
      return props.data;
    }
    return props.data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, props.data]);

  useEffect(() => {
    setQuery('');
  }, [props.selectedData]);

  const renderValue = () => {
    if (!props?.selectedData) {
      return props?.placeholder || `Select ${props?.label || ''}`;
    }
    switch (typeof props?.selectedData?.value) {
      case 'string':
        return props?.selectedData?.value;
      case 'object':
        return props?.selectedData?.value?.name;
      default:
        return props?.placeholder || `Select ${props?.label || ''}`;
    }
  };

  if (!props.search) {
    return (
      <View
        style={[styles.dropDownView, props.containerStyle]}
        onLayout={(e) => {
          setY(e.nativeEvent.layout.y);
        }}
      >
        {props.label && (
          <Text style={[styles.dropDownLabel, props.labelStyle]}>
            {props.label}
          </Text>
        )}
        <TouchableOpacity onPress={props.toggle} style={styles.btnDropDown}>
          <View style={styles.dropDownRow}>
            <Text style={styles.btnDropDownText}>{renderValue()}</Text>
            <Image
              source={require('../imgs/chevron.png')}
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
            />
          </View>
        </TouchableOpacity>

        {props.open && (
          <DropDownFlatlist
            data={props.data}
            onSelect={props.onSelect}
            selectedBtnColor={props.selectedBtnColor}
            onSelectTitle={props.onSelectTitle}
            subButtonStyle={props.subButtonStyle}
            subTitleStyle={props.subTitleStyle}
            selectedData={props.selectedData}
            btnColor={props.btnColor}
            subBtnColor={props.subBtnColor}
            titleButtonStyle={props.titleButtonStyle}
            titleStyle={props.titleStyle}
            disabledTitleStyle={props.disabledTitleStyle}
            disabledButtonStyle={props.disabledButtonStyle}
            dropDownContainerStyle={props.dropDownContainerStyle}
            SubCheckedIcon={props.SubCheckedIcon}
            subViewStyle={props.subViewStyle}
            TitleIcon={props.TitleIcon}
            titleProps={props.titleProps}
            subTitleProps={props.subTitleProps}
            checkedIconPosition={props.checkedIconPosition}
            onEndReached={props.onEndReached}
            EmptyListView={props.EmptyListView}
            parentY={y}
            hasLabel={!!props.label}
            SubSeparator={props.SubSeparator}
            selectedSubBtnStyle={props.selectedSubBtnStyle}
            selectedSubTitleStyle={props.selectedSubTitleStyle}
          />
        )}
      </View>
    );
  }

  if (!open && props.search) {
    return (
      <View
        style={[styles.dropDownView, props.containerStyle]}
        onLayout={(e) => {
          setY(e.nativeEvent.layout.y);
        }}
      >
        {props.label && (
          <Text style={[styles.dropDownLabel, props.labelStyle]}>
            {props.label}
          </Text>
        )}
        <TouchableOpacity
          onPress={() => {
            setOpen(true);
            props.toggle();
          }}
          style={styles.btnDropDown}
        >
          <View style={styles.dropDownRow}>
            <Text style={styles.btnDropDownText}>{renderValue()}</Text>
            <Image
              source={require('../imgs/chevron-down.png')}
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={[styles.dropDownView, props.containerStyle]}
      onLayout={(e) => {
        setY(e.nativeEvent.layout.y);
      }}
    >
      {props.label && (
        <Text style={[styles.dropDownLabel, props.labelStyle]}>
          {props.label}
        </Text>
      )}
      <View
        style={[
          styles.btnDropDown,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}
      >
        <View
          style={[
            {
              flexDirection: 'row',
              flex: 1,
            },
            props.searchContainerStyle,
          ]}
        >
          <View
            style={{
              width: 20,
            }}
          >
            {props.SearchIconLeft || (
              <Image
                source={require('../imgs/search.png')}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
              />
            )}
          </View>
          <TextInput
            placeholder={props?.placeholder || `Search ${props?.label || ''}`}
            value={query}
            onChangeText={(txt) => {
              setQuery(txt);
              props.onChangeSearchText?.(txt);
            }}
            style={[
              {
                flex: 1,
              },
              props.searchInputStyle,
            ]}
          />
          <TouchableOpacity
            onPress={() => {
              setQuery('');
              props.onChangeSearchText?.('');
              if (!query) {
                setOpen(false);
                props.toggle();
              }
            }}
            style={{
              width: 14,
            }}
          >
            {props.SearchIconRight || (
              <Image
                source={require('../imgs/close.png')}
                resizeMode="contain"
                style={{ width: 14, height: 20 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {props.open && (
        <DropDownFlatlist
          data={data}
          onSelect={(value) => {
            setOpen(false);
            props.onSelect(value);
          }}
          selectedBtnColor={props.selectedBtnColor}
          onSelectTitle={props.onSelectTitle}
          subButtonStyle={props.subButtonStyle}
          subTitleStyle={props.subTitleStyle}
          selectedData={props.selectedData}
          btnColor={props.btnColor}
          subBtnColor={props.subBtnColor}
          titleButtonStyle={props.titleButtonStyle}
          titleStyle={props.titleStyle}
          disabledTitleStyle={props.disabledTitleStyle}
          disabledButtonStyle={props.disabledButtonStyle}
          dropDownContainerStyle={props.dropDownContainerStyle}
          SubCheckedIcon={props.SubCheckedIcon}
          subViewStyle={props.subViewStyle}
          TitleIcon={props.TitleIcon}
          titleProps={props.titleProps}
          subTitleProps={props.subTitleProps}
          checkedIconPosition={props.checkedIconPosition}
          onEndReached={props.onEndReached}
          EmptyListView={props.EmptyListView}
          parentY={y}
          hasLabel={!!props.label}
          SubSeparator={props.SubSeparator}
          selectedSubBtnStyle={props.selectedSubBtnStyle}
          selectedSubTitleStyle={props.selectedSubTitleStyle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownView: {
    zIndex: 5,
    marginBottom: 20,
  },
  btnDropDown: {
    minHeight: 40,
    minWidth: 120,
    borderColor: colors.grey1,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  btnDropDownText: {
    color: colors.dark,
    fontSize: 13,
  },
  customErrorText: {
    color: colors.error,
    fontSize: 12,
    paddingLeft: 5,
    marginTop: 5,
  },
  dropDownLabel: {
    fontSize: 13,
    paddingBottom: 3,
    color: colors.dark,
  },
  dropDownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DropDownSelect;
