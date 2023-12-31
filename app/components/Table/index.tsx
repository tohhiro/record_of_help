import React, { forwardRef } from 'react';
import '../../styles/globals.css';
import { tableStyles } from './index.styles';

export type Props = {
  id: string;
  person: string;
  curtain: number;
  dish: number | null;
  landry: number | null;
  prepareEat: number | null;
  towel: number | null;
  comments: string | null;
  created_at: string;
  del_flag: boolean | null;
};

export const theadNames = {
  person: '名前',
  dish: '皿洗い',
  curtain: 'カーテン開閉',
  prepareEat: '食事準備',
  landry: '洗濯物片付け',
  towel: '芽生タオル',
  comments: 'コメント',
  created_at: '日付',
};

export const Table = forwardRef(({ data }: { data: Props[] | null | undefined }) => {
  const createTable = (tableData: Props[]) => {
    const filteredTableData = tableData.filter((item) => item.del_flag === false);
    return (
      <table className={tableStyles.table}>
        <thead className={tableStyles.thead}>
          <tr>
            {Object.keys(theadNames).map((key: string, idx) => (
              <th key={idx} className={tableStyles.th}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredTableData.map((item) => (
            <tr key={item.id} className={tableStyles.tr}>
              <td className={tableStyles.td}>{item.person}</td>
              <td className={tableStyles.td}>{item.dish}</td>
              <td className={tableStyles.td}>{item.curtain}</td>
              <td className={tableStyles.td}>{item.prepareEat}</td>
              <td className={tableStyles.td}>{item.landry}</td>
              <td className={tableStyles.td}>{item.towel}</td>
              <td className={tableStyles.td}>{item.comments}</td>
              <td className={tableStyles.td}>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={tableStyles.container}>
      {data ? createTable(data) : <div>データがありません</div>}
    </div>
  );
});
