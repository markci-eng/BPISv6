import Database from "better-sqlite3";

const db = new Database(
  "C:\\Users\\markc\\Documents\\BPISv6 Database\\database.db",
);

// create table if not exists
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS ReinstateTransactions (
    lpaNo VARCHAR(15) PRIMARY KEY,
    trxMonth VARCHAR(5),
    riType VARCHAR(2),
    orgUnitCode VARCHAR(6),
    statusId VARCHAR(3),
    newLPANo VARCHAR(15),
    newPlanCode VARCHAR(15),
    dateReceivedByOP DATETIME,
    dateReceivedFrOP DATETIME,
    dateInformed DATETIME,
    dateCompiled DATETIME,
    daysProcessed INTEGER,
    notes VARCHAR(100),
    auditUser VARCHAR(25),
    auditDate DATETIME,
    isReported INTEGER CHECK(isReported IN (0,1)),
    editUser VARCHAR(25),
    editDate DATETIME
  )
`,
).run();

export default db;
