export type MoolroopTabId = 'premise' | 'research' | 'decisions' | 'flow' | 'screens' | 'reflection';

export interface MoolroopTabDef {
  id: MoolroopTabId;
  label: string;
}

export const MOOLROOP_TABS: MoolroopTabDef[] = [
  { id: 'premise', label: '(Premise & Scope)' },
  { id: 'research', label: '(Research)' },
  { id: 'decisions', label: '(Decisions)' },
  { id: 'flow', label: '(Flow)' },
  { id: 'screens', label: '(Screens)' },
  { id: 'reflection', label: '(Reflection)' },
];
