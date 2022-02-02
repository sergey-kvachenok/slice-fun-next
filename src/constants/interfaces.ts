import { HeadlineType } from './types';

export interface IBaseShow {
  id: string;
  verified: boolean;
  title: string;
  category: string[];
  description: string;
  image: string;
  mainImage: string;
}

export interface IPopularShow extends IBaseShow {
  source?: string;
}

export interface ILibraryShow extends IBaseShow {
  source?: string;
  date: string;
}

export interface ILatestShow {
  id: string;
  title: string;
  date: string;
  description: string;
  extendedDescription: string;
  source?: string;
  image: string;
}

export interface IVideo extends ILatestShow {
  date: string;
}

export interface ISingleShow {
  id: string;
  verified: boolean;
  title: string;
  mainImage: string;
  headlines: HeadlineType[];
  latest: ILatestShow[];
  premium: ILatestShow[];
  video: IVideo[];
}
