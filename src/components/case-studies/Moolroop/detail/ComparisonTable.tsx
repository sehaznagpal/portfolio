import styles from './ComparisonTable.module.css';

type Mark = 'yes' | 'partial' | 'no';

interface Column {
  name: string;
  sub: string;
  highlight?: boolean;
}

interface Row {
  label: string;
  marks: Mark[];
}

const COLUMNS: Column[] = [
  { name: 'Amazon', sub: 'AMAZON KARIGAR' },
  { name: 'GiTagged', sub: 'GITAGGED' },
  { name: 'GoSwadeshi', sub: 'GOSWADESHI' },
  { name: 'India Handmade', sub: 'INDIAHANDMADE' },
  { name: 'iTokri', sub: 'ITOKRI' },
  { name: 'Moolroop', sub: 'MY PROPOSAL', highlight: true },
];

const ROWS: Row[] = [
  { label: 'Mobile app', marks: ['yes', 'yes', 'no', 'yes', 'no', 'yes'] },
  { label: 'GI-certified products only', marks: ['no', 'yes', 'no', 'no', 'no', 'yes'] },
  { label: 'Shows GI registration number', marks: ['no', 'no', 'no', 'no', 'no', 'yes'] },
  { label: 'Links to official registry', marks: ['no', 'no', 'no', 'no', 'no', 'yes'] },
  { label: 'Shows authorised seller info', marks: ['no', 'no', 'no', 'no', 'partial', 'yes'] },
  { label: 'Discovery by geographic origin', marks: ['partial', 'partial', 'yes', 'partial', 'yes', 'yes'] },
];

function Dot({ mark }: { mark: Mark }) {
  return <span className={`${styles.dot} ${styles[mark]}`} aria-label={mark} />;
}

export default function ComparisonTable() {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.rowHeadCell} />
            {COLUMNS.map((col) => (
              <th
                key={col.name}
                className={`${styles.colHeadCell} ${col.highlight ? styles.highlightCol : ''}`}
              >
                <span className={styles.colName}>{col.name}</span>
                <span className={styles.colSub}>{col.sub}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label}>
              <th className={styles.rowLabel} scope="row">
                {row.label}
              </th>
              {row.marks.map((mark, i) => (
                <td
                  key={COLUMNS[i].name}
                  className={COLUMNS[i].highlight ? styles.highlightCol : ''}
                >
                  <Dot mark={mark} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.legend}>
        <span>
          <Dot mark="yes" /> Yes
        </span>
        <span>
          <Dot mark="partial" /> Partial
        </span>
        <span>
          <Dot mark="no" /> No
        </span>
      </div>
    </div>
  );
}
