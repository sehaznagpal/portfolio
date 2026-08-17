import SectionHeader from '../SectionHeader';
import InfoBox from '../InfoBox';
import styles from './SolutionSection.module.css';

export default function SolutionSection({ onOpenSitemap }: { onOpenSitemap: () => void }) {
  return (
    <div className={styles.section}>
      <div className={styles.content}>
        <SectionHeader
          number="03"
          title="Solution and Decisions"
          action={
            <button type="button" className={styles.actionButton} onClick={onOpenSitemap}>
              View Sitemap →
            </button>
          }
        />

        <InfoBox variant="white">
          <p>
            MoolRoop compresses this to three: browse the product, tap verify, see the
            verification summary, decide. Same underlying registry, radically less friction to
            reach it.
          </p>
        </InfoBox>

        <InfoBox variant="yellow">
          <p>Three structural calls followed from those principles:</p>
          <ul className={styles.decisionList}>
            <li>
              <strong>Multiple SKUs per product.</strong> A single craft, a Pashmina, say, can be
              sold as a shawl, a kurta, or a saree, each possibly from a different seller. Rather
              than treating &ldquo;Pashmina&rdquo; as one listing, each product has its own page
              listing every SKU beneath it.
            </li>
            <li>
              <strong>Filtering by both state and type.</strong> Someone browsing &ldquo;what&rsquo;s
              made in Rajasthan&rdquo; and someone looking for &ldquo;a gift under a certain
              budget&rdquo; are running two genuinely different searches. Most platforms only
              support one well. MoolRoop supports both as independent filters.
            </li>
            <li>
              <strong>Persistent search.</strong> A search bar stays visible across every browsing
              screen rather than sitting behind a separate search state, since the whole point of
              the app is reducing friction.
            </li>
          </ul>
        </InfoBox>

        <InfoBox variant="white">
          <p>
            MoolRoop started as a question about trust and became an exercise in making public
            information usable. It doesn&rsquo;t solve counterfeiting, it makes fraud harder to
            pull off and gives honest sellers a clear way to show proof. The open question is
            whether buyers would actually use the verification trail, or just trust that
            it&rsquo;s there, something only a live version could answer.
          </p>
          <p>
            <strong>Next steps:</strong> live registry sync, QR verification, artisan profiles, a
            seller dashboard, regional stories, and consumer education on GI protection.
          </p>
        </InfoBox>
      </div>
    </div>
  );
}
