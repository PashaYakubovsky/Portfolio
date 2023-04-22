import { resolve } from "path";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

export default () => {
    const filePath = resolve(__dirname, "db.json");
    const adapter = new JSONFile(filePath);
    const defaultData = { cases: [] };
    const db = new Low(adapter, defaultData);

    return db;
};
