import Realm from 'realm';

class FormData extends Realm.Object {}
FormData.schema = {
  name: 'FormData',
  properties: {
     stanchezza: 'int'
  }
};

export default new Realm({ schema: [FormData] });
