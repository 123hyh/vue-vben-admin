// Used to configure the general configuration of some components without modifying the components

import type { SorterResult } from '../components/Table';
import { isEmpty } from '../utils/is';

export default {
  // basic-table setting
  table: {
    // Form interface request general configuration
    // support xxx.xxx.xxx
    fetchSetting: {
      // The field name of the current page passed to the background
      pageField: 'pageNum',
      // The number field name of each page displayed in the background
      sizeField: 'pageSize',
      // Field name of the form data returned by the interface
      listField: 'rows',
      // Total number of tables returned by the interface field name
      totalField: 'total',
    },
    // Number of pages that can be selected
    pageSizeOptions: ['10', '50', '80', '100'],
    // Default display quantity on one page
    defaultPageSize: 10,
    // Default Size
    defaultSize: 'middle',
    // Custom general sort function
    defaultSortFn: (sortInfo: SorterResult) => {
      const { field, order } = sortInfo;
      const res = isEmpty(order)
        ? {}
        : { orderByColumn: field, isAsc: order === 'ascend' ? 'asc' : 'desc' };

      return res;
    },
    // Custom general filter function
    defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
      return Object.keys(data).reduce((prev, k) => {
        const d = data[k] ?? [];
        if (d.length == 0) {
          return prev;
        }
        prev[k] = d.join(',');
        return prev;
      }, {});
    },
  },
  // scrollbar setting
  scrollbar: {
    // Whether to use native scroll bar
    // After opening, the menu, modal, drawer will change the pop-up scroll bar to native
    native: false,
  },
};
