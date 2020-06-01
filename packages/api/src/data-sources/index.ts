import ArcsecondAPI from './ArcsecondAPI';


export type DataSources = {
  arcsecondAPI: ArcsecondAPI
};

export default () => ({
  arcsecondAPI: new ArcsecondAPI()
});
