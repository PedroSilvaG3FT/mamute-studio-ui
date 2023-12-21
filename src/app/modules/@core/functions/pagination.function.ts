export const filterListPagination = <Data>(
  list: Data[],
  page: number,
  pageSize: number
) => {
  return list.slice((page - 1) * pageSize, page * pageSize);
};
