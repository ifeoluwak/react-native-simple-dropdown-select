/* eslint-disable react-native/no-inline-styles */
import { FlatList, TouchableOpacity, View, Image, Text } from 'react-native';
import { colors } from '../colors';
import type { BaseData, DropDownSubListProps } from '../types';

export const PickerItemFlatlist = ({
  item: data,
  openItem,
  setOpenItem,
  selectedBtnColor,
  btnColor,
  selectedData,
  onSelect,
  titleStyle,
  titleButtonStyle,
  subButtonStyle,
  subTitleStyle,
  disabled,
  disabledButtonStyle,
  disabledTitleStyle,
  selectedSubBtnColor,
  subBtnColor,
  SubCheckedIcon,
  TitleIcon,
  subViewStyle,
  selectedSubTitleStyle,
  selectedSubBtnStyle,
  titleProps,
  subTitleProps,
  checkedIconPosition = 'left',
  SubSeparator,
}: DropDownSubListProps) => {
  const isOpen = openItem?.id === data?.id;
  const extraData = openItem?.extraData;
  const extraDataType = typeof extraData?.[0];

  const renderItemSeparator = () =>
    SubSeparator || <View style={{ height: 5 }} />;

  if (disabled) {
    return (
      <View
        style={[
          {
            backgroundColor: colors.grey3,
            padding: 5,
          },
          disabledButtonStyle,
        ]}
      >
        <Text
          style={[
            {
              color: colors.grey2,
            },
            disabledTitleStyle,
          ]}
        >
          {data.name}
        </Text>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity
        style={[
          {
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
          titleButtonStyle,
          {
            backgroundColor: isOpen
              ? selectedBtnColor || colors.grey1
              : btnColor || colors.white,
          },
        ]}
        onPress={() => {
          if (data?.extraData?.length) {
            setOpenItem(isOpen ? null : data);
          } else {
            onSelect({ ...data, value: data.name });
          }
        }}
      >
        <Text
          {...titleProps}
          style={[{ fontSize: 14, fontWeight: '600' }, titleStyle]}
        >
          {data.name}
        </Text>
        {data?.extraData?.length &&
          (TitleIcon ||
            (isOpen ? (
              <Image
                source={require('../imgs/chevron-up.png')}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
              />
            ) : (
              <Image
                source={require('../imgs/chevron-down.png')}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
              />
            )))}
      </TouchableOpacity>

      {isOpen && data?.extraData?.length && (
        <View style={[{ paddingTop: 5, paddingHorizontal: 10 }, subViewStyle]}>
          {extraDataType === 'string' ? (
            <FlatList
              data={extraData as string[]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const selectedValue = selectedData?.value as string;
                const isSelected =
                  selectedData?.id === data.id && selectedValue === item;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      onSelect({ ...data, value: item });
                      setOpenItem(null);
                    }}
                    style={[
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                      },
                      subButtonStyle,
                      {
                        backgroundColor: isSelected
                          ? selectedSubBtnColor || 'transparent'
                          : subBtnColor || 'transparent',
                      },
                      selectedSubBtnStyle && isSelected
                        ? selectedSubBtnStyle
                        : {},
                    ]}
                  >
                    {isSelected &&
                      checkedIconPosition === 'left' &&
                      (SubCheckedIcon || (
                        <Image
                          source={require('../imgs/check.png')}
                          resizeMode="contain"
                          style={{ width: 10, height: 10, marginRight: 5 }}
                        />
                      ))}
                    <Text
                      {...subTitleProps}
                      style={[
                        { fontSize: 13 },
                        subTitleStyle,
                        selectedSubTitleStyle && isSelected
                          ? selectedSubTitleStyle
                          : {},
                      ]}
                    >
                      {item}
                    </Text>
                    {isSelected &&
                      checkedIconPosition === 'right' &&
                      (SubCheckedIcon || (
                        <Image
                          source={require('../imgs/check.png')}
                          resizeMode="contain"
                          style={{ width: 10, height: 10, marginLeft: 5 }}
                        />
                      ))}
                  </TouchableOpacity>
                );
              }}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={renderItemSeparator}
            />
          ) : (
            <FlatList
              data={openItem?.extraData as BaseData[]}
              renderItem={({ item }) => {
                const selectedValue = selectedData?.value as BaseData;
                const isSelected = selectedValue?.id === item.id;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      onSelect({ ...data, value: item });
                      setOpenItem(null);
                    }}
                    style={[
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                      },
                      subButtonStyle,
                      {
                        backgroundColor: isSelected
                          ? selectedSubBtnColor || 'transparent'
                          : subBtnColor || 'transparent',
                      },
                      selectedSubBtnStyle && isSelected
                        ? selectedSubBtnStyle
                        : {},
                    ]}
                  >
                    {isSelected &&
                      checkedIconPosition === 'left' &&
                      (SubCheckedIcon || (
                        <Image
                          source={require('../imgs/check.png')}
                          resizeMode="contain"
                          style={{ width: 10, height: 10, marginRight: 5 }}
                        />
                      ))}
                    <Text
                      style={[
                        { fontSize: 13 },
                        subTitleStyle,
                        selectedSubTitleStyle && isSelected
                          ? selectedSubTitleStyle
                          : {},
                      ]}
                    >
                      {item.name}
                    </Text>
                    {isSelected &&
                      checkedIconPosition === 'right' &&
                      (SubCheckedIcon || (
                        <Image
                          source={require('../imgs/check.png')}
                          resizeMode="contain"
                          style={{ width: 10, height: 10, marginRight: 5 }}
                        />
                      ))}
                  </TouchableOpacity>
                );
              }}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={renderItemSeparator}
            />
          )}
        </View>
      )}
    </View>
  );
};
