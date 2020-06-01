import type { Exoplanet, AsyncPaginatedGetter  } from '../types';

import { RESTDataSource } from 'apollo-datasource-rest';


export default class ArcsecondAPI extends RESTDataSource<any> {
  baseURL = 'https://api.arcsecond.io/';

  getExoplanets: AsyncPaginatedGetter<Exoplanet> = (params) => (
    this.get('exoplanets', params)
  );
}
