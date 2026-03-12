import Database from "better-sqlite3";

const db = new Database(
  "C:\\Users\\Mark Cristian Ibe\\Documents\\BPISv6 Database\\database.db",
);

// create table if not exists
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS ReinstateTransactions (
    LPANo VARCHAR(15) PRIMARY KEY,
    TrxMonth VARCHAR(5),
    RIType VARCHAR(2),
    OrgUnitCode VARCHAR(6),
    StatusID VARCHAR(3),
    NewLPANo VARCHAR(15),
    NewPlanCode VARCHAR(15),
    DateReceivedByOP DATETIME,
    DateReceivedFrOP DATETIME,
    DateInformed DATETIME,
    DateCompiled DATETIME,
    DaysProcessed INTEGER,
    Notes VARCHAR(100),
    AuditUser VARCHAR(25),
    AuditDate DATETIME,
    IsReported INTEGER CHECK(IsReported IN (0,1)),
    EditUser VARCHAR(25),
    EditDate DATETIME
  )
`,
).run();

export default db;
