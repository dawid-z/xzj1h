import { configureStore } from "./configure-store";
import initialData from "./initial-data.json";

const store = configureStore(initialData);

export default store;
