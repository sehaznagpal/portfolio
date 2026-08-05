import styles from './IdeationPanelBody.module.css';

export default function IdeationPanelBody() {
  return (
    <>
      <p className={styles.intro}>
        Today, verifying a craft means noticing a GI tag, searching a government website
        separately, finding the registration, comparing seller details, and deciding whether to
        trust it, <span className={styles.emphasis}>five steps outside the shopping flow itself.</span>{' '}
        MoolRoop compresses this to three: browse the product, tap verify, see the verification
        summary, decide. Same underlying registry, radically less friction to reach it.
      </p>

      <div className={styles.principles}>
        <p className={styles.principlesLead}>Three structural calls followed from those principles:</p>
        <ul className={styles.list}>
          <li>
            <span className={styles.highlight}>Multiple SKUs per product.</span> A single craft, a
            Pashmina, say, can be sold as a shawl, a kurta, or a saree, each possibly from a
            different seller. Rather than treating &ldquo;Pashmina&rdquo; as one listing, each
            product has its own page listing every SKU beneath it. Verification stays tied to the
            craft itself, while sellers and formats vary underneath.
          </li>
          <li>
            <span className={styles.highlight}>Filtering by both state and type.</span> Someone
            browsing &ldquo;what&rsquo;s made in Rajasthan&rdquo; and someone looking for
            &ldquo;a gift under a certain budget&rdquo; are running two genuinely different
            searches. Most platforms only support one well. MoolRoop supports both as independent
            filters.
          </li>
          <li>
            <span className={styles.highlight}>Persistent search.</span> A search bar stays
            visible across every browsing screen rather than sitting behind a separate search
            state, since the whole point of the app is reducing friction, adding a tap to find the
            search bar would undercut that.
          </li>
        </ul>
      </div>
    </>
  );
}
