import { createContext } from 'react';
import SHOP_DATA from './shop.data';

export const CollectionsContext = createContext({
  collections: SHOP_DATA
});

export default CollectionsContext;
