import Realm from 'realm';

class Fatigue extends Realm.Object {}

Fatigue.schema = {
  name: 'Fatigue',
  properties: {
    id: { type: 'int', indexed: true },
    rating: { type: 'int', default: 0 },
    message: { type: 'string', optional: true },
  },
};

export default new Realm({ schema: [Fatigue] });
