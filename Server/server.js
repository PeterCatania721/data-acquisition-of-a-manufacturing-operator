import { app } from './app.js';

import {config} from 'dotenv';

import { connectDatabase, emptyDatabase, insertData} from "./config/database.js";

config(
    {
        path: './config/config.env'
    }
);

connectDatabase();



app.listen(process.env.PORT, () => {
  console.log("Server running on port  "+ process.env.PORT);

  emptyDatabase();

  insertData();
});