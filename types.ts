
export interface Location {
  latitude: number;
  longitude: number;
}

export interface GroundingChunk {
  maps: {
    uri: string;
    title: string;
    placeAnswerSources?: {
      reviewSnippets?: {
        uri: string;
        title: string;
        snippet: string;
      }[];
    }[];
  };
}

export interface Result {
  text: string;
  sources: GroundingChunk[];
}
