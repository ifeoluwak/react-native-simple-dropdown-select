import type { StyleProp, TextProps, TextStyle, ViewStyle } from 'react-native';

export interface BaseData {
  id: number;
  name: string;
  [key: string]: any;
}
export interface ListData extends BaseData {
  extraData?: string[] | BaseData[];
  disabled?: boolean;
}

export interface ListDataSelected extends ListData {
  value: string | BaseData;
}

export interface ListDataSelectedOptional extends ListData {
  value?: string | BaseData;
}

export interface BaseProps {
  data: ListData[];
  onSelect: (item: ListDataSelected) => void;
  selectedData?: ListDataSelected;
  selectedBtnColor?: string;
  selectedSubBtnColor?: string;
  btnColor?: string;
  subBtnColor?: string;
  onSelectTitle?: (item: ListData) => void;
  titleStyle?: StyleProp<TextStyle>;
  titleButtonStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  disabledButtonStyle?: StyleProp<ViewStyle>;
  disabledTitleStyle?: StyleProp<TextStyle>;
  subButtonStyle?: StyleProp<ViewStyle>;
  subTitleStyle?: StyleProp<TextStyle>;
  SubCheckedIcon?: React.ReactElement;
  TitleIcon?: React.ReactElement;
  subViewStyle?: StyleProp<ViewStyle>;
  selectedSubTitleStyle?: StyleProp<TextStyle>;
  selectedSubBtnStyle?: StyleProp<ViewStyle>;
  titleProps?: Omit<TextProps, 'style'>;
  subTitleProps?: Omit<TextProps, 'style'>;
  checkedIconPosition?: 'left' | 'right';
  SubSeparator?: React.ReactElement;
}

export interface DropDownProps extends BaseProps {
  toggle: () => void;
  open: boolean;
  label?: string;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  dropDownContainerStyle?: StyleProp<ViewStyle>;
  search?: boolean;
  searchInputStyle?: StyleProp<ViewStyle>;
  searchContainerStyle?: StyleProp<ViewStyle>;
  EmptyListView?: React.ReactElement;
  onChangeSearchText?: (text: string) => void;
  SearchIconLeft?: React.ReactElement;
  SearchIconRight?: React.ReactElement;
  onEndReached?:
    | ((info: { distanceFromEnd: number }) => void)
    | null
    | undefined;
  labelStyle?: StyleProp<ViewStyle>;
  showsVerticalScrollIndicator?: boolean;
}

export interface DropDownFlatListProps extends BaseProps {
  EmptyListView?: React.ReactElement;
  dropDownContainerStyle?: StyleProp<ViewStyle>;
  showsVerticalScrollIndicator?: boolean;
  onEndReached?:
    | ((info: { distanceFromEnd: number }) => void)
    | null
    | undefined;
  parentY: number;
  hasLabel: boolean;
}

export interface DropDownSubListProps extends Omit<BaseProps, 'data'> {
  item: ListData;
  openItem: ListData | null;
  setOpenItem: (item: ListData | null) => void;
  onSelect: (item: ListDataSelected) => void;
}
