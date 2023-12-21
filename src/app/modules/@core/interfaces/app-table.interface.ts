export interface ITableCell {
  def: string;
  key: string;
  label: string;
}

export interface ITableCellAction<Data> {
  icon: string;
  title: string;
  callback: (item: Data, index: number) => void;
}
