import * as admin from "firebase-admin";
import serviceAccount from "../config/serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://votest-a5cc8.firebaseio.com/"
});

const db = admin.database();

module.exports = db;
