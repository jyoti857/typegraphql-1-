import { createConnection } from "typeorm"

export const testConn = (drop:boolean = false) => {
  return createConnection({
    name: 'default',
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    useUnifiedTopology: true,
    database: "graphql-1!-test",
    synchronize: drop,
    dropSchema: drop,
    entities: [
      __dirname + "/../entities/*.*"
    ]
  })
}