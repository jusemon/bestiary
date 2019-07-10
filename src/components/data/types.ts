export enum Types {
  Navigation = 'navigation',
  Title = 'title',
  Panel = 'panel',
  Section = 'section',
  Group = 'group',
  Data = 'data',
  Header = 'header',
  Image = 'image'
}

export interface DataDetailed {
  label: string;
  'item-name': string;
  layout: string;
  value: string;
  source: string;
}

export interface DataDetailedSection {
  label: string;
  'item-name': string;
  value: DataTypeGroup[];
}

export interface DataDetailedPanel {
  collapse: string;
  'item-name': string;
  value: DataTypeSection[];
}

export interface DataDetailedGroup {
  collapse: string;
  'item-name': string;
  'row-items'?: number;
  layout?: string;
  value: (DataType | DataTypeHeader)[];
}

export interface DataDetailedImage {
  name: string;
  url: string;
}

export interface DataTypeBase {
  type: Types;
  data: DataDetailed | DataDetailedPanel | DataDetailedSection | DataDetailedGroup | DataDetailedImage[];
}

export interface DataTypePanel extends DataTypeBase {
  type: Types.Panel;
  data: DataDetailedPanel;
}

export interface DataTypeSection extends DataTypeBase {
  type: Types.Section;
  data: DataDetailedSection;
}

export interface DataTypeGroup extends DataTypeBase {
  type: Types.Group;
  data: DataDetailedGroup;
}

export interface DataTypeImage extends DataTypeBase {
  type: Types.Image;
  data: DataDetailedImage[];
}

export interface DataType extends DataTypeBase {
  type: Types.Data;
  data: DataDetailed;
}

export interface DataTypeHeader extends DataTypeBase {
  type: Types.Header;
  data: DataDetailed;
}

export interface Data {
  data: DataTypeBase;
  metadata: [];
  parser_tag_version: number;
}
