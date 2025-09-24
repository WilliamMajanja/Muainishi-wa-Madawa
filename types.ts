export type AnalysisMode = 'text' | 'image';

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface DrugInfo {
  name: string;
  classification: string;
  uses: string;
  sideEffects: string;
  sources: GroundingSource[];
}

export interface HistoryEntry {
  drugInfo: DrugInfo;
  timestamp: string;
}
