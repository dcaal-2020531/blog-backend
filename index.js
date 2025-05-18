import { initServer } from "./config/app.js";
      import { config } from "dotenv"; 
import { connect } from "./config/mongo.js";
import {defaultPublication} from './src/Publications/publications.controller.js'


config()
connect()
initServer()
defaultPublication()
