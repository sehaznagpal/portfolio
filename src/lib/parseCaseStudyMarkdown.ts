export interface CaseStudyChapter {
  heading: string;
  body: string;
}

export interface ParsedCaseStudy {
  title: string;
  subtitle: string | null;
  tagline: string;
  inShort: string;
  chapters: CaseStudyChapter[];
}

/* The source .md files are copied verbatim from the finalized case-study content and
   always follow: header block --- chapters --- "## Handling notes" (build guidance,
   never rendered). Split on the two `---` dividers rather than "last ---", since the
   handling-notes heading is the only reliable anchor for where public copy ends. */
export function parseCaseStudyMarkdown(raw: string): ParsedCaseStudy {
  const dividerSplit = raw.split(/\n---\n/);
  const header = dividerSplit[0];
  const body = dividerSplit[1] ?? '';

  const titleMatch = header.match(/^#\s+(.+)$/m);
  const subtitleMatch = header.match(/^###\s+(.+)$/m);
  const taglineMatch = header.match(/^\*([^*].+?)\*$/m);
  const inShortMatch = header.match(/\*\*In short:\*\*\s*(.+)$/m);

  const chapterMatches = [...body.matchAll(/^###\s+(.+)$/gm)];
  const chapters: CaseStudyChapter[] = chapterMatches.map((match, i) => {
    const start = match.index! + match[0].length;
    const end = chapterMatches[i + 1]?.index ?? body.length;
    return {
      heading: match[1].trim(),
      body: body.slice(start, end).trim(),
    };
  });

  return {
    title: titleMatch?.[1].trim() ?? '',
    subtitle: subtitleMatch?.[1].trim() ?? null,
    tagline: taglineMatch?.[1].trim() ?? '',
    inShort: inShortMatch?.[1].trim() ?? '',
    chapters,
  };
}
