export interface IBreed {
  id: string;
  name: string;
  temperament: string;
  temperamentArr: string[];
  description: string;
  origin: string;
  life_span: string;
  reference_image_id: string;
  weight: IWeight;
  cardsInfo: ICardInfo[];
  features: IFeatureInfo[];
  adaptability: number;
  affection_level: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  vocalisation: number;
}

interface IWeight {
  imperial: string;
  metric: string;
}

interface ICardInfo {
  id: string;
  name: string;
  value: string | number;
  icon: string;
}

interface IFeatureInfo {
  id: string;
  name: string;
  value: number;
}