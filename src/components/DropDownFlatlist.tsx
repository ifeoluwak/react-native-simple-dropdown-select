import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../colors';
import { useEffect, useRef, useState } from 'react';
import type {
  DropDownFlatListProps,
  ListData,
  ListDataSelectedOptional,
} from '../types';
import { PickerItemFlatlist } from './PickerItemFlatlist';

export const DropDownFlatlist = ({
  data,
  onSelect,
  selectedBtnColor,
  selectedSubBtnColor,
  btnColor,
  subBtnColor,
  selectedData,
  onSelectTitle,
  titleStyle,
  titleButtonStyle,
  disabledButtonStyle,
  disabledTitleStyle,
  subButtonStyle,
  subTitleStyle,
  SubCheckedIcon,
  EmptyListView,
  dropDownContainerStyle,
  showsVerticalScrollIndicator,
  subViewStyle,
  TitleIcon,
  titleProps,
  subTitleProps,
  checkedIconPosition,
  onEndReached,
  parentY,
  hasLabel,
  SubSeparator,
  selectedSubBtnStyle,
  selectedSubTitleStyle,
}: DropDownFlatListProps) => {
  const [openItem, setOpenItem] = useState<ListData | null>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  const scrollRef = useRef<FlatList>(null);

  useEffect(() => {
    if (selectedData) {
      const selected: ListDataSelectedOptional = { ...selectedData };
      delete selected.value;
      setOpenItem(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (openItem && scrollRef.current && data) {
      const index = data?.findIndex((d) => d.id === openItem.id);
      if (index !== -1) {
        scrollRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5,
        });
      }
    }
  }, [scrollRef, openItem, data]);

  const renderItem = ({ item }: { item: ListData }) => {
    return (
      <PickerItemFlatlist
        item={item}
        openItem={openItem}
        setOpenItem={(p) => {
          setOpenItem(p);
          onSelectTitle && onSelectTitle(item);
        }}
        selectedBtnColor={selectedBtnColor}
        btnColor={btnColor}
        selectedData={selectedData}
        onSelect={onSelect}
        titleStyle={titleStyle}
        titleButtonStyle={titleButtonStyle}
        disabledButtonStyle={disabledButtonStyle}
        disabledTitleStyle={disabledTitleStyle}
        disabled={item.disabled}
        selectedSubBtnColor={selectedSubBtnColor}
        subBtnColor={subBtnColor}
        subButtonStyle={subButtonStyle}
        subTitleStyle={subTitleStyle}
        selectedSubTitleStyle={selectedSubTitleStyle}
        SubCheckedIcon={SubCheckedIcon}
        subViewStyle={subViewStyle}
        TitleIcon={TitleIcon}
        titleProps={titleProps}
        subTitleProps={subTitleProps}
        checkedIconPosition={checkedIconPosition}
        SubSeparator={SubSeparator}
        selectedSubBtnStyle={selectedSubBtnStyle}
      />
    );
  };

  const top =
    parentY + containerHeight + 100 >= Dimensions.get('window').height;

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      easing: Easing.linear,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <View>
      <Animated.View
        onLayout={(e) => {
          setContainerHeight(e.nativeEvent.layout.height);
        }}
        style={[
          style.card,
          style.shadowProp,
          style.dropDownContainer,
          dropDownContainerStyle,
          // eslint-disable-next-line react-native/no-inline-styles
          top ? { bottom: hasLabel ? 70 : 50 } : { top: 0 },
          { opacity },
        ]}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          nestedScrollEnabled
          ListEmptyComponent={
            EmptyListView || (
              <View style={style.noDataView}>
                <Text>No data available</Text>
              </View>
            )
          }
          ref={scrollRef}
          getItemLayout={(_, index) => ({
            length: 25,
            offset: 30 * index,
            index,
          })}
          onEndReached={onEndReached}
        />
      </Animated.View>
    </View>
  );
};

const style = StyleSheet.create({
  dropDownContainer: {
    width: '100%',
    minWidth: 200,
    alignSelf: 'center',
    position: Platform.OS === 'ios' ? 'absolute' : 'relative',
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingTop: 5,
    paddingBottom: 8,
    maxHeight: 200,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  dropDownLabels: {
    paddingVertical: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    paddingTop: 24,
    paddingBottom: 25,
    paddingHorizontal: 20,
    width: '100%',
    marginVertical: 3,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  noDataView: {
    padding: 10,
    alignItems: 'center',
  },
});
