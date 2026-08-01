import styles from './ReflectionTab.module.css';

const ITEMS = [
  {
    number: '01',
    title: 'Live Registry Integration',
    body: 'Automatically sync authorised seller information from official databases.',
  },
  {
    number: '02',
    title: 'QR Verification',
    body: 'Scan a GI label to instantly verify authenticity.',
  },
  {
    number: '03',
    title: 'Artisan Profiles',
    body: 'Introduce the people behind every craft.',
  },
  {
    number: '04',
    title: 'Seller Dashboard',
    body: 'Allow verified sellers to manage products and certification details.',
  },
  {
    number: '05',
    title: 'Regional Stories',
    body: 'Highlight local traditions, materials and production techniques.',
  },
  {
    number: '06',
    title: 'Consumer Education',
    body: 'Explain what GI protection means through interative guides.',
  },
];

export default function ReflectionTab() {
  return (
    <div className={styles.tab}>
      <h2 className="ms-heading">Where this could go next</h2>

      <div className={styles.grid}>
        {ITEMS.map((item, i) => (
          <div key={item.number} className={styles.cell} data-alt={i % 2}>
            <p className={styles.cellNumber}>{item.number}</p>
            <p className={styles.cellTitle}>{item.title}</p>
            <p className={styles.cellBody}>{item.body}</p>
          </div>
        ))}
      </div>

      <div className={styles.reflection}>
        <h3 className="ms-heading">Reflection</h3>
        <div className="ms-body">
          <p>
            MoolRoop started as a question about trust and became an exercise in making public
            information usable.
          </p>
          <p>
            One thing worth naming directly: this does not solve counterfeiting. What the
            provenance trail does is make that fraud more visible and more effortful and give
            honest sellers a way to show proof.
          </p>
          <p>
            The next meaningful step would be testing whether buyers actually engage with the
            verification trail or simply trust its presence as a signal. Those are two different
            UX outcomes, and this prototype cannot answer which one is real without users.
          </p>
        </div>
      </div>
    </div>
  );
}
